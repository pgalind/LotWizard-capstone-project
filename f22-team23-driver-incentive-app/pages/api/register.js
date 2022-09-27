// This is the AWS registration endpoint

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const { COGNITO_REGION, COGNITO_CLIENT_ID } = process.env;

export default async function handler(req, res) {
  // Only POST requests should be allowed; return 405 error Method Not Allowed
  if (req.method !== 'POST') return res.status(405).send();
  // parameters for SignUpCommand
  const params = {
    ClientId: COGNITO_CLIENT_ID,
    Password: req.body.password,
    Username: req.body.username,
    UserAttributes: [
      {
        Name: 'email',
        Value: req.body.email,
      },
      {
        Name: 'address',
        Value: req.body.address,
      },
      // You can add custom parameters such as:
      {
        Name: 'custom:truckModel',
        Value: 'Mack',
      },
    ],
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });

  const signUpCommand = new SignUpCommand(params);

  // return the response to the useRegister hook after sending the SignUpCommand
  try {
    const response = await cognitoClient.send(signUpCommand);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log(err);
    return res
      .status(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
