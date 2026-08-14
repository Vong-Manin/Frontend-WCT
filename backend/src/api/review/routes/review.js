'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::review.review', {
  config: {
    find: { auth: false, policies: ['global::optional-clerk-auth'] },
    findOne: { auth: false, policies: ['global::optional-clerk-auth'] },
    create: { auth: false, policies: ['global::clerk-auth'] },
    update: { auth: false, policies: ['global::clerk-auth'] },
    delete: { auth: false, policies: ['global::clerk-auth'] },
  },
});
