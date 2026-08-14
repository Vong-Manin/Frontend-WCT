'use strict';

const { factories } = require('@strapi/strapi');
const { createBookingReference, roundMoney } = require('../../../utils/booking');
const { findByDocumentOrLegacy } = require('../../../utils/content');
const {
  positiveInteger,
  requestData,
  requireFields,
  validDate,
} = require('../../../utils/http');
const { errors } = require('@strapi/utils');

const { ValidationError } = errors;

module.exports = factories.createCoreController(
  'api::room-booking.room-booking',
  ({ strapi }) => ({
    async create(ctx) {
      const data = requestData(ctx);
      requireFields(data, [
        'customerName',
        'email',
        'phone',
        'checkInDate',
        'checkOutDate',
      ]);

      const checkIn = validDate(data.checkInDate, 'checkInDate');
      const checkOut = validDate(data.checkOutDate, 'checkOutDate');
      const numberOfNights = Math.round((checkOut - checkIn) / 86_400_000);
      if (numberOfNights < 1) {
        throw new ValidationError('checkOutDate must be after checkInDate.');
      }

      const selections = Array.isArray(data.rooms) ? data.rooms : [];
      if (!selections.length) {
        throw new ValidationError('At least one room selection is required.');
      }

      const resolvedItems = [];
      for (const selection of selections) {
        const room = await findByDocumentOrLegacy(
          strapi,
          'api::room.room',
          selection,
          'Room',
        );
        const quantity = positiveInteger(selection.quantity || 1, 'quantity', { max: 10 });
        const guests = positiveInteger(selection.guests || 1, 'guests', {
          max: Number(room.maxGuests) || 20,
        });
        resolvedItems.push({ room, quantity, guests });
      }

      const subtotal = roundMoney(
        resolvedItems.reduce(
          (sum, item) => sum + Number(item.room.price) * item.quantity * numberOfNights,
          0,
        ),
      );
      const serviceFee = roundMoney(subtotal * 0.1);
      const tax = roundMoney(subtotal * 0.12);
      const totalPrice = roundMoney(subtotal + serviceFee + tax);
      const numberOfRooms = resolvedItems.reduce((sum, item) => sum + item.quantity, 0);
      const numberOfGuests = resolvedItems.reduce(
        (sum, item) => sum + item.guests * item.quantity,
        0,
      );

      const booking = await strapi.documents('api::room-booking.room-booking').create({
        data: {
          bookingReference: createBookingReference('KSR'),
          customerName: String(data.customerName).trim(),
          email: String(data.email).trim(),
          phone: String(data.phone).trim(),
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          numberOfGuests,
          numberOfRooms,
          numberOfNights,
          subtotal,
          serviceFee,
          tax,
          totalPrice,
          bookingStatus: 'confirmed',
          specialRequest: data.specialRequest || '',
          paymentMethod: data.paymentMethod || 'credit_card',
          bookingItems: resolvedItems.map(({ room, quantity, guests }) => ({
            roomDocumentId: room.documentId,
            legacyId: room.legacyId,
            title: room.title,
            nightlyPrice: Number(room.price),
            quantity,
            guests,
          })),
          rooms: {
            connect: resolvedItems.map(({ room }) => room.documentId),
          },
          user: ctx.state.siteUser.documentId,
        },
      });

      ctx.status = 201;
      ctx.body = {
        data: {
          documentId: booking.documentId,
          bookingReference: booking.bookingReference,
          bookingStatus: booking.bookingStatus,
          numberOfNights,
          subtotal,
          serviceFee,
          tax,
          totalPrice,
        },
      };
    },
  }),
);
