// This is the AWS login/auth endpoint

import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const { COGNITO_REGION, COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } = process.env;

export default async function handler(req, res) {
  // Only POST requests should be allowed; return 405 error Method Not Allowed
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH', // Reference AWS User Pool to see other AuthFlow options
    ClientId: COGNITO_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    // AuthParameters must be in ALL CAPS or they won't be recognized by the useAuth end point
    AuthParameters: {
      USERNAME: req.body.username,
      PASSWORD: req.body.password,
    },
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });

  const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);

  // return the response to the useAuth hook after sending the adminInitiateAuthCommand
  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand);
    console.log(response);
    return res.status(response['$metadata'].httpStatusCode).json({
      ...response.AuthenticationResult,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
