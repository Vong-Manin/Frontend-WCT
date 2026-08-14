'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const data = require('./data.json');

const repoRoot = path.resolve(__dirname, '../../..');

function asTime(value) {
  if (!value) return null;
  const [hours, minutes = '00'] = value.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000`;
}

async function upsertByLegacyId(strapi, uid, entry) {
  const store = strapi.documents(uid);
  const [existing] = await store.findMany({
    filters: { legacyId: { $eq: entry.legacyId } },
    limit: 1,
  });
  if (existing) {
    return store.update({ documentId: existing.documentId, data: entry });
  }
  return store.create({ data: entry });
}

function fileExtension(contentType, source) {
  const types = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  if (types[contentType]) return types[contentType];
  const extension = path.extname(new URL(source, 'http://local.test').pathname).slice(1);
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension) ? extension : 'jpg';
}

async function materializeImage(source, baseName) {
  if (source.startsWith('/')) {
    const localPath = path.join(repoRoot, 'public', source);
    const stat = fs.statSync(localPath);
    const extension = path.extname(localPath).slice(1).toLowerCase();
    return {
      filepath: localPath,
      originalFilename: `${baseName}.${extension}`,
      mimetype: extension === 'png' ? 'image/png' : extension === 'webp' ? 'image/webp' : 'image/jpeg',
      size: stat.size,
      temporary: false,
    };
  }

  const response = await fetch(source, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = (response.headers.get('content-type') || 'image/jpeg').split(';')[0];
  const extension = fileExtension(type, source);
  const temporaryPath = path.join(os.tmpdir(), `${baseName}-${Date.now()}.${extension}`);
  fs.writeFileSync(temporaryPath, Buffer.from(await response.arrayBuffer()));
  const stat = fs.statSync(temporaryPath);
  return {
    filepath: temporaryPath,
    originalFilename: `${baseName}.${extension}`,
    mimetype: type,
    size: stat.size,
    temporary: true,
  };
}

async function attachMedia(strapi, { uid, documentId, field, sources, legacyId }) {
  const populated = await strapi.documents(uid).findOne({
    documentId,
    populate: [field],
  });
  const current = populated[field];
  if ((Array.isArray(current) && current.length) || (!Array.isArray(current) && current)) return;

  const sourceList = Array.isArray(sources) ? sources : [sources];
  for (let index = 0; index < sourceList.length; index += 1) {
    const source = sourceList[index];
    if (!source) continue;
    let file;
    let temporaryFilepath;
    try {
      const baseName = `${uid.split('.').pop().replace(/[^a-z0-9-]/gi, '-')}-${legacyId}-${index + 1}`;
      file = await materializeImage(source, baseName);
      temporaryFilepath = file.temporary ? file.filepath : null;
      await strapi.plugin('upload').service('upload').upload({
        data: {
          refId: populated.id,
          ref: uid,
          field,
          fileInfo: {
            name: file.originalFilename,
            alternativeText: populated.title || file.originalFilename,
          },
        },
        files: file,
      });
    } catch (error) {
      strapi.log.warn(`Could not import media ${source}: ${error.message}`);
    } finally {
      if (temporaryFilepath?.startsWith(os.tmpdir()) && fs.existsSync(temporaryFilepath)) {
        fs.unlinkSync(temporaryFilepath);
      }
    }
  }
}

async function seedRooms(strapi) {
  for (const room of data.rooms) {
    const { id, images, reviews, ...fields } = room;
    const document = await upsertByLegacyId(strapi, 'api::room.room', {
      legacyId: id,
      ...fields,
      reviewCount: reviews,
    });
    await attachMedia(strapi, {
      uid: 'api::room.room',
      documentId: document.documentId,
      field: 'images',
      sources: images,
      legacyId: id,
    });
  }
}

async function seedActivities(strapi) {
  for (const activity of data.activities) {
    const { id, image, ...fields } = activity;
    const document = await upsertByLegacyId(strapi, 'api::activity.activity', {
      legacyId: id,
      ...fields,
      popular: id <= 3,
      maxGuests: 10,
    });
    await attachMedia(strapi, {
      uid: 'api::activity.activity',
      documentId: document.documentId,
      field: 'image',
      sources: image,
      legacyId: id,
    });
  }
}

async function seedMenuItems(strapi) {
  for (const menuItem of data.menuItems) {
    const { id, image, operatingHours, ...fields } = menuItem;
    const document = await upsertByLegacyId(strapi, 'api::menu-item.menu-item', {
      legacyId: id,
      ...fields,
      openingTime: asTime(operatingHours?.open),
      closingTime: asTime(operatingHours?.close),
    });
    await attachMedia(strapi, {
      uid: 'api::menu-item.menu-item',
      documentId: document.documentId,
      field: 'image',
      sources: image,
      legacyId: id,
    });
  }
}

async function seedGallery(strapi) {
  for (const galleryItem of data.galleryItems) {
    const { id, image, ...fields } = galleryItem;
    const document = await upsertByLegacyId(strapi, 'api::gallery-item.gallery-item', {
      legacyId: id,
      ...fields,
    });
    await attachMedia(strapi, {
      uid: 'api::gallery-item.gallery-item',
      documentId: document.documentId,
      field: 'image',
      sources: image,
      legacyId: id,
    });
  }
}

async function seedReviews(strapi) {
  const store = strapi.documents('api::review.review');
  const rooms = await strapi.documents('api::room.room').findMany({ limit: 100 });
  for (const review of data.reviews) {
    const [existing] = await store.findMany({
      filters: {
        username: { $eq: review.name },
        comment: { $eq: review.comment },
      },
      limit: 1,
    });
    if (existing) continue;
    const room = rooms.find((candidate) => candidate.title === review.roomType);
    await store.create({
      data: {
        username: review.name,
        comment: review.comment,
        rating: review.rating,
        roomType: review.roomType,
        verified: review.verified,
        likes: review.likes,
        stayDate: review.createdAt?.slice(0, 10),
        ...(room ? { room: room.documentId } : {}),
      },
    });
  }
}

module.exports = async function seed({ strapi }) {
  strapi.log.info('Synchronizing the preserved resort content into Strapi…');
  await seedRooms(strapi);
  await seedActivities(strapi);
  await seedMenuItems(strapi);
  await seedGallery(strapi);
  await seedReviews(strapi);
  strapi.log.info('Resort seed synchronization complete.');
};
