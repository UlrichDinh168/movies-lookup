# Movies lookup

# Live demo: https://movies-lookup.netlify.app/

## Introduction

An application that displays top trending movies and helps to search for all previous movies' details.

## Development process

This app built using React, Redux and written in Typescript. It ultilises [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) to fetch movies and details. Continuous Integration and Continuous Deployment (CI/CD) pipeline is set up for every branch, ensuring smooth development and deployment process.

In **develop** and **master** branch, a series of `jobs` to push the `build` folder to `AWS S3` for storage and deploy the application to `AWS Cloudfront`

## Techs

- **Frontend**: React, TypeScript, Redux, React-router-dom, Sass
- **Hosting**: Netlify, AWS Cloudfront, AWS S3
- **Others**: Slack API, Docker, CircleCI, Terraform

## Setup

1. Create CircleCI account and follow the instructions.

2. Create AWS Account Free tier and obtain `AWS_ACCESS_KEY_ID` `AWS_REGION`, `AWS_SECRET_ACCESS_KEY`.
   [Instruction](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

3. Create Slack account and workspace, then obtain `SLACK_ACCESS_TOKEN` and `SLACK_DEFAULT_CHANNEL`.
   [Instruction](https://api.slack.com/tutorials)

4. Add above environment variables in **Project Setting/Environment Variables** [Link](https://circleci.com/docs/env-vars/)

5. Signup for an account and acquire the `API_KEY` from [TMDB](https://developer.themoviedb.org/docs/getting-started).

6. Create a `.env` file and add the environment variable `VITE_API_SECRET='your_api_key'`

## Scripts

- `npm i` to install the dependencies.
- `npm run dev` to start the development server.
- `npm run build` to create build folder in `dist`.
- `npm run preview` to see the build content.
