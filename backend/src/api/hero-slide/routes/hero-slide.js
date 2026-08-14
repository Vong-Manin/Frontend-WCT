'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::hero-slide.hero-slide', {
  only: ['find', 'findOne'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
