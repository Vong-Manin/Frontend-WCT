'use strict';

const { factories } = require('@strapi/strapi');
const { findByDocumentOrLegacy } = require('../../../utils/content');
const { notFound, requestData, requireFields, validDate } = require('../../../utils/http');
const { assertOwner } = require('../../../utils/ownership');
const { errors } = require('@strapi/utils');

const { ValidationError } = errors;

function safeReview(review, clerkUserId) {
  return {
    documentId: review.documentId,
    title: review.title || '',
    comment: review.comment,
    rating: review.rating,
    name: review.username,
    stayDate: review.stayDate,
    roomType: review.roomType || review.room?.title || '',
    verified: Boolean(review.verified),
    likes: review.likes || 0,
    adminReply: review.adminReply || null,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    room: review.room
      ? {
          documentId: review.room.documentId,
          legacyId: review.room.legacyId,
          title: review.room.title,
        }
      : null,
    isOwner: Boolean(clerkUserId && review.user?.clerkUserId === clerkUserId),
  };
}

function editableReviewData(data) {
  requireFields(data, ['comment', 'rating']);
  const rating = Number(data.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new ValidationError('rating must be an integer from 1 to 5.');
  }
  if (data.stayDate) validDate(data.stayDate, 'stayDate');

  return {
    title: data.title ? String(data.title).trim() : '',
    comment: String(data.comment).trim(),
    rating,
    stayDate: data.stayDate || null,
    roomType: data.roomType ? String(data.roomType).trim() : '',
  };
}

async function resolveRoom(strapi, data) {
  const reference = data.room ||
    (data.roomDocumentId ? { documentId: data.roomDocumentId } : null);
  if (!reference) return null;
  return findByDocumentOrLegacy(strapi, 'api::room.room', reference, 'Room');
}

module.exports = factories.createCoreController('api::review.review', ({ strapi }) => ({
  async find(ctx) {
    const filters = {};
    const roomLegacyId = Number(ctx.query?.roomLegacyId);
    if (Number.isInteger(roomLegacyId)) {
      filters.room = { legacyId: { $eq: roomLegacyId } };
    }

    const reviews = await strapi.documents('api::review.review').findMany({
      filters,
      populate: ['user', 'room'],
      sort: ['createdAt:desc'],
      limit: 100,
    });
    ctx.body = {
      data: reviews.map((review) => safeReview(review, ctx.state.clerkUserId)),
      meta: { count: reviews.length },
    };
  },

  async findOne(ctx) {
    const review = await strapi.documents('api::review.review').findOne({
      documentId: ctx.params.id,
      populate: ['user', 'room'],
    });
    if (!review) notFound('Review was not found.');
    ctx.body = { data: safeReview(review, ctx.state.clerkUserId) };
  },

  async create(ctx) {
    const data = requestData(ctx);
    const editable = editableReviewData(data);
    const room = await resolveRoom(strapi, data);
    const review = await strapi.documents('api::review.review').create({
      data: {
        ...editable,
        username: ctx.state.siteUser.displayName,
        verified: true,
        likes: 0,
        user: ctx.state.siteUser.documentId,
        ...(room ? { room: room.documentId, roomType: room.title } : {}),
      },
      populate: ['user', 'room'],
    });

    ctx.status = 201;
    ctx.body = { data: safeReview(review, ctx.state.clerkUserId) };
  },

  async update(ctx) {
    const existing = await strapi.documents('api::review.review').findOne({
      documentId: ctx.params.id,
      populate: ['user'],
    });
    if (!existing) notFound('Review was not found.');
    assertOwner(existing.user, ctx.state.siteUser);

    const data = requestData(ctx);
    const editable = editableReviewData(data);
    const room = await resolveRoom(strapi, data);
    const review = await strapi.documents('api::review.review').update({
      documentId: existing.documentId,
      data: {
        ...editable,
        ...(room ? { room: room.documentId, roomType: room.title } : {}),
      },
      populate: ['user', 'room'],
    });
    ctx.body = { data: safeReview(review, ctx.state.clerkUserId) };
  },

  async delete(ctx) {
    const existing = await strapi.documents('api::review.review').findOne({
      documentId: ctx.params.id,
      populate: ['user'],
    });
    if (!existing) notFound('Review was not found.');
    assertOwner(existing.user, ctx.state.siteUser);

    await strapi.documents('api::review.review').delete({
      documentId: existing.documentId,
    });
    ctx.body = { data: { documentId: existing.documentId } };
  },
}));

module.exports.safeReview = safeReview;
