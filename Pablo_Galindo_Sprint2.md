# Sprint 2 Notes

The goal is to implement sign in with AWS Cognito and authentication

1. Install NextAught running command 'npm i next-auth'
2. Import { Provider } from 'next-auth/client' inside \_app.js and wrap the return with the Provider session.
3. Set up AWS Cognito user pool and domain
4. Add Cognito provider to pages/api directory

### Setting up AWS Cognito

Followed the steps in this video: https://www.youtube.com/watch?v=U4hEflgix9c

- Created a user pool: Team23-user-pool
- Created a domain name: team23-lotwizard --> Added to .env.local
- Obtained client ID and client secret from General Settings --> Added to .env.local
