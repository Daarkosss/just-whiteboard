# Docker Setup Guide

This guide will help you create and start a Docker container for your project using Docker Compose.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup

1. **Create a `.env` file:**

   Create a `.env` file in the same directory and add the following environment variables:

   ```env
   MONGODB_CONNECTION_STRING=<your_mongodb_connection_string>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GOOGLE_REDIRECT_URI=<your_google_redirect_uri>
   VITE_GOOGLE_CLIENT_ID=<your_vite_google_client_id>
   ```

2. **Build the Docker image:**

   Run the following command to build the Docker image:

   ```sh
   docker-compose build
   ```

3. **Start the Docker container:**

   Run the following command to start the Docker container:

   ```sh
   docker-compose up
   ```

   This command will start both the backend and frontend services.

## Accessing the Application

- **Backend:** The backend service will be available at `https://localhost:3000`.
- **Frontend:** The frontend service will be available at `http://localhost:5173`.

## Stopping the Application

To stop the running Docker containers, press `Ctrl + C` in the terminal where the containers are running, or run:

```sh
docker-compose down
```

This command stops and removes all the containers defined in your `docker-compose.yml` file.

## Notes

- Ensure your `.env` file contains all the necessary environment variables.
- If you encounter any issues, check the logs using:

  ```sh
  docker-compose logs
  ```