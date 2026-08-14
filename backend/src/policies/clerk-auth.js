'use strict';

const {
  getOrCreateSiteUser,
  verifyClerkRequest,
} = require('../utils/clerk');

/**
 * Required on all booking mutations and review create/update/delete routes.
 * It resolves the owner from the verified Clerk token and places the related
 * Strapi site-user on state for the controller.
 */
module.exports = async (policyContext, _config, { strapi }) => {
  const verifiedToken = await verifyClerkRequest(policyContext);
  const siteUser = await getOrCreateSiteUser(strapi, verifiedToken.sub);

  policyContext.state.clerkUserId = verifiedToken.sub;
  policyContext.state.siteUser = siteUser;
  return true;
};
