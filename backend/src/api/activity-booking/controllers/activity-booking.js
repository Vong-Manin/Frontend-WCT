'use strict';

const { factories } = require('@strapi/strapi');
const { createBookingReference, roundMoney } = require('../../../utils/booking');
const { findByDocumentOrLegacy } = require('../../../utils/content');
const { positiveInteger, requestData, requireFields, validDate } = require('../../../utils/http');

module.exports = factories.createCoreController(
  'api::activity-booking.activity-booking',
  ({ strapi }) => ({
    async create(ctx) {
      const data = requestData(ctx);
      requireFields(data, ['customerName', 'email', 'bookingDate', 'numberOfPeople', 'activity']);
      validDate(data.bookingDate, 'bookingDate');

      const activity = await findByDocumentOrLegacy(
        strapi,
        'api::activity.activity',
        data.activity,
        'Activity',
      );
      const numberOfPeople = positiveInteger(data.numberOfPeople, 'numberOfPeople', {
        max: Number(activity.maxGuests) || 50,
      });
      const totalPrice = roundMoney(Number(activity.price) * numberOfPeople);

      const booking = await strapi.documents('api::activity-booking.activity-booking').create({
        data: {
          bookingReference: createBookingReference('ACT'),
          customerName: String(data.customerName).trim(),
          email: String(data.email).trim(),
          phone: data.phone ? String(data.phone).trim() : '',
          bookingDate: data.bookingDate,
          bookingTime: data.bookingTime || '',
          numberOfPeople,
          totalPrice,
          specialRequest: data.specialRequest || '',
          bookingStatus: 'confirmed',
          activity: activity.documentId,
          user: ctx.state.siteUser.documentId,
        },
      });

      ctx.status = 201;
      ctx.body = {
        data: {
          documentId: booking.documentId,
          bookingReference: booking.bookingReference,
          bookingStatus: booking.bookingStatus,
          totalPrice,
        },
      };
    },
  }),
);
