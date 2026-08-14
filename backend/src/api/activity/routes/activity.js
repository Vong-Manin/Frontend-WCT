'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::activity.activity', {
  only: ['find', 'findOne'],
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
