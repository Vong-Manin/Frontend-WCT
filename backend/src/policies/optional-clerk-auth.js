'use strict';

const { verifyClerkRequest } = require('../utils/clerk');

/**
 * Public review reads remain public. When a valid token is present, this policy
 * adds its verified subject so the response can mark the current user's cards.
 */
module.exports = async (policyContext) => {
  const verifiedToken = await verifyClerkRequest(policyContext, {
    optional: true,
  });

  policyContext.state.clerkUserId = verifiedToken?.sub || null;
  return true;
};
