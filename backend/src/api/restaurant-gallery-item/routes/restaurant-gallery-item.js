'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter(
  'api::restaurant-gallery-item.restaurant-gallery-item',
  {
    only: ['find', 'findOne'],
    config: {
      find: { auth: false },
      findOne: { auth: false },
    },
  },
);
