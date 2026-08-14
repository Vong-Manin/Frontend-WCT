'use strict';

const { notFound } = require('./http');

async function findByDocumentOrLegacy(strapiInstance, uid, reference, label) {
  if (!reference) notFound(`${label} was not supplied.`);

  if (reference.documentId) {
    const document = await strapiInstance.documents(uid).findOne({
      documentId: reference.documentId,
    });
    if (document) return document;
  }

  const legacyId = Number(reference.legacyId ?? reference.id);
  if (Number.isInteger(legacyId)) {
    const [document] = await strapiInstance.documents(uid).findMany({
      filters: { legacyId: { $eq: legacyId } },
      limit: 1,
    });
    if (document) return document;
  }

  notFound(`${label} was not found.`);
}

module.exports = { findByDocumentOrLegacy };
