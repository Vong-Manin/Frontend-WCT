'use strict';

const { createClerkClient, verifyToken } = require('@clerk/backend');
const { errors } = require('@strapi/utils');

const { UnauthorizedError } = errors;

function getBearerToken(ctx) {
  const authorization = ctx.request?.headers?.authorization || '';
  const [scheme, token] = authorization.split(' ');

  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
}

function getAuthorizedParties() {
  return (process.env.CLERK_AUTHORIZED_PARTIES || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/**
 * Verifies the Clerk session token presented by the existing Next.js app.
 * Browser-supplied user IDs are deliberately ignored; `sub` is read only
 * from this cryptographically verified token.
 */
async function verifyClerkRequest(ctx, { optional = false } = {}) {
  const token = getBearerToken(ctx);
  if (!token) {
    if (optional) return null;
    throw new UnauthorizedError('Sign in is required.');
  }

  const secretKey = process.env.CLERK_SECRET_KEY;
  const jwtKey = process.env.CLERK_JWT_KEY;
  if (!secretKey && !jwtKey) {
    if (optional) return null;
    throw new UnauthorizedError('Clerk token verification is not configured.');
  }

  try {
    const authorizedParties = getAuthorizedParties();
    return await verifyToken(token, {
      ...(secretKey ? { secretKey } : {}),
      ...(jwtKey ? { jwtKey } : {}),
      ...(authorizedParties.length ? { authorizedParties } : {}),
    });
  } catch (error) {
    if (optional) return null;
    // Do not leak token details. Strapi's global logger is not guaranteed to
    // exist when this helper is exercised in isolation (for example in tests).
    console.warn(`Rejected Clerk token: ${error.message}`);
    throw new UnauthorizedError('Your session is invalid or expired.');
  }
}

async function getClerkProfile(clerkUserId) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return {
      displayName: 'Resort Guest',
      email: null,
      avatarUrl: null,
    };
  }

  const client = createClerkClient({ secretKey });
  const clerkUser = await client.users.getUser(clerkUserId);
  const displayName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
    clerkUser.username ||
    'Resort Guest';

  return {
    displayName,
    email: clerkUser.primaryEmailAddress?.emailAddress || null,
    avatarUrl: clerkUser.imageUrl || null,
  };
}

/**
 * Mirrors a verified Clerk identity into Strapi so relations can be used for
 * bookings and reviews without introducing Strapi's separate sign-in flow.
 */
async function getOrCreateSiteUser(strapiInstance, clerkUserId) {
  const userStore = strapiInstance.documents('api::site-user.site-user');
  const [existing] = await userStore.findMany({
    filters: { clerkUserId: { $eq: clerkUserId } },
    limit: 1,
  });

  const profile = await getClerkProfile(clerkUserId);

  if (existing) {
    return userStore.update({
      documentId: existing.documentId,
      data: profile,
    });
  }

  return userStore.create({
    data: {
      clerkUserId,
      ...profile,
    },
  });
}

module.exports = {
  getBearerToken,
  getOrCreateSiteUser,
  verifyClerkRequest,
};
