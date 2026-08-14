'use strict';

const { factories } = require('@strapi/strapi');
const { createBookingReference } = require('../../../utils/booking');
const { findByDocumentOrLegacy } = require('../../../utils/content');
const { positiveInteger, requestData, requireFields, validDate } = require('../../../utils/http');

module.exports = factories.createCoreController(
  'api::table-booking.table-booking',
  ({ strapi }) => ({
    async create(ctx) {
      const data = requestData(ctx);
      requireFields(data, [
        'customerName',
        'email',
        'phone',
        'bookingDate',
        'bookingTime',
        'numberOfGuests',
      ]);
      validDate(data.bookingDate, 'bookingDate');
      const numberOfGuests = positiveInteger(data.numberOfGuests, 'numberOfGuests', {
        max: 20,
      });
      const menuItem = data.menuItem
        ? await findByDocumentOrLegacy(
            strapi,
            'api::menu-item.menu-item',
            data.menuItem,
            'Menu item',
          )
        : null;

      const booking = await strapi.documents('api::table-booking.table-booking').create({
        data: {
          bookingReference: createBookingReference('TBL'),
          customerName: String(data.customerName).trim(),
          email: String(data.email).trim(),
          phone: String(data.phone).trim(),
          bookingDate: data.bookingDate,
          bookingTime: String(data.bookingTime).trim(),
          numberOfGuests,
          specialRequest: data.specialRequest || '',
          bookingStatus: 'confirmed',
          ...(menuItem ? { menuItem: menuItem.documentId } : {}),
          user: ctx.state.siteUser.documentId,
        },
      });

      ctx.status = 201;
      ctx.body = {
        data: {
          documentId: booking.documentId,
          bookingReference: booking.bookingReference,
          bookingStatus: booking.bookingStatus,
        },
      };
    },
  }),
);
