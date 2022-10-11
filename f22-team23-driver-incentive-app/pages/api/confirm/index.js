// This is the AWS confirm endpoint

import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const { COGNITO_REGION, COGNITO_CLIENT_ID } = process.env;

export default async function handler(req, res) {
  // Only POST requests should be allowed; return 405 error Method Not Allowed
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    ClientId: COGNITO_CLIENT_ID,
    ConfirmationCode: req.body.code, // code sent to the user's email address
    Username: req.body.username,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });

  const confirmSignUpCommand = new ConfirmSignUpCommand(params);

  // return the response to the useRegister hook after sending the confirmSignUpCommand
  try {
    const response = await cognitoClient.send(confirmSignUpCommand);
    console.log(response);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log(err);
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
