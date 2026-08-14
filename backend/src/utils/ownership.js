'use strict';

const { errors } = require('@strapi/utils');

const { ForbiddenError } = errors;

function assertOwner(resourceUser, currentUser) {
  if (!resourceUser?.documentId || resourceUser.documentId !== currentUser?.documentId) {
    throw new ForbiddenError('You can only change your own review.');
  }
}

module.exports = { assertOwner };
