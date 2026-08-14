'use strict';

const { errors } = require('@strapi/utils');

const { NotFoundError, ValidationError } = errors;

function requestData(ctx) {
  const data = ctx.request?.body?.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ValidationError('Request body must contain a data object.');
  }
  return data;
}

function requireFields(data, fields) {
  const missing = fields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === '',
  );
  if (missing.length) {
    throw new ValidationError(`Missing required fields: ${missing.join(', ')}`);
  }
}

function positiveInteger(value, field, { max } = {}) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || (max && parsed > max)) {
    throw new ValidationError(
      `${field} must be an integer between 1 and ${max || 'the allowed maximum'}.`,
    );
  }
  return parsed;
}

function validDate(value, field) {
  const date = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(date.getTime())) {
    throw new ValidationError(`${field} must use YYYY-MM-DD format.`);
  }
  return date;
}

function notFound(message) {
  throw new NotFoundError(message);
}

module.exports = {
  notFound,
  positiveInteger,
  requestData,
  requireFields,
  validDate,
};
