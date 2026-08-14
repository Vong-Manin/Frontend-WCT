'use strict';

const crypto = require('node:crypto');

function createBookingReference(prefix) {
  return `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

module.exports = {
  createBookingReference,
  roundMoney,
};
