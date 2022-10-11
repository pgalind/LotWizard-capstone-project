{
  /* Cognito automatically attempts to find the user and send a verfification code to their registered email.
If the user fails to be verified (user enters the wrong username or password), then this method is called
to manually RE-send a confirmation code */
}

import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const { COGNITO_REGION, COGNITO_CLIENT_ID } = process.env;

export default async function handler(req, res) {
  // Only POST requests should be allowed; return 405 error Method Not Allowed
  if (req.method !== 'POST') return res.status(405).send();

  const params = {
    ClientId: COGNITO_CLIENT_ID,
    Username: req.body.username,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });

  const resendConfirmationCodeCommand = new ResendConfirmationCodeCommand(
    params
  );

  // return the response to the useAuth hook after sending the ResendConfirmationCodeCommand
  try {
    const response = await cognitoClient.send(resendConfirmationCodeCommand);
    console.log(response);
    return res.status(response['$metadata'].httpStatusCode).send();
  } catch (err) {
    console.log(err);
    return res
      .stat(err['$metadata'].httpStatusCode)
      .json({ message: err.toString() });
  }
}
