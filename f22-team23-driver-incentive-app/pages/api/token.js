import Cookie from 'js-cookie';

export default async (req, res) => {
  try {
    const EbayAuthToken = require('ebay-oauth-nodejs-client');

    const ebayAuthToken = new EbayAuthToken({
      clientId: 'EdwardNg-safedriv-PRD-58bac051d-c757e3c5',
      clientSecret: 'PRD-8bac051db05f-b762-4d2f-82ef-d9e2',
      redirectUri:
        'https://auth.ebay.com/oauth2/authorize?client_id=EdwardNg-safedriv-PRD-58bac051d-c757e3c5&response_type=code&redirect_uri=Edward_Ng-EdwardNg-safedr-zyfsu&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly',
    });

    const response = await ebayAuthToken.getApplicationToken('PRODUCTION');
    Cookie.set('token', response.access_token);

    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
