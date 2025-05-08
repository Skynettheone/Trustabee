import { Amplify } from 'aws-amplify';

// Temporarily disabled AWS Cognito configuration
/*
const awsConfig = {
  Auth: {
    Cognito: {
      region: process.env.REACT_APP_AWS_REGION || 'eu-north-1',
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || 'eu-north-1_UpgxmHbpv',
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '11m4984pemrf8490j266to6i3m',
      mandatorySignIn: true,
    }
  }
};

Amplify.configure(awsConfig);
*/

const awsConfig = {}; // Empty config for now
export default awsConfig;   