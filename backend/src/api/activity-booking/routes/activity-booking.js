'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::activity-booking.activity-booking', {
  only: ['create'],
  config: {
    create: { auth: false, policies: ['global::clerk-auth'] },
  },
});
