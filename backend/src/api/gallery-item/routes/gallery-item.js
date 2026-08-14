'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::gallery-item.gallery-item', {
  only: ['find', 'findOne'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
