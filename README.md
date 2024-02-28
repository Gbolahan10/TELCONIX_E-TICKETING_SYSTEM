# telconix-backend-test-app

## Overview
- This project is a backend application built with Node.js and Express.js. - It provides endpoints for user authentication, user management, generating payment links, and managing subscriptions.

## Getting Started
To run the project locally, follow these steps:

- ### Clone the Project
```bash
git clone https://github.com/Gbolahan10/TELCONIX_E-TICKETING_SYSTEM.git
```
- ### Setting up the project locally
1. install all dependencies (run in terminal) - 
```bash
npm install
```

2. build the project (run in terminal) 
```bash
npm run build
```

3. ensure that mongodb is running and accessible.

4. set up stripe cli to receive webhook events.

Use Stripe CLI to simulate Stripe events in your local environment.
 
 - step 1:
 create a stripe account and retrieve your unique ENDPOINT_SECRET and WEBHOOK_API_KEY. Replace them with their corresponding environment variables in the .env.development file.

- step 2:
Use this link to learn how to setup stripe-CLI on your system
https://docs.stripe.com/stripe-cli

- step 3:
Log in with your Stripe account
```bash
stripe login
```

- step 4:
Setup stripe to listen for webhook events at designated url
```bash
stripe listen --forward-to localhost:8000/payment/webhook
```

5. start development server (run in terminal)
```bash
npm run dev
```
