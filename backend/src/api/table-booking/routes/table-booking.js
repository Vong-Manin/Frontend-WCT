'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::table-booking.table-booking', {
  only: ['create'],
  config: {
    create: { auth: false, policies: ['global::clerk-auth'] },
  },
});
