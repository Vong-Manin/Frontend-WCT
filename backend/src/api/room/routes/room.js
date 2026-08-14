'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::room.room', {
  only: ['find', 'findOne'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
