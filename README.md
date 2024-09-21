# MERN Stack Image Upload to AWS S3 and MongoDB

![MERN S3 Image Uploader](https://img.shields.io/badge/MERN%20Stack-Image%20Upload-green) ![AWS S3](https://img.shields.io/badge/AWS%20S3-Image%20Storage-yellow)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [AWS S3 Configuration](#aws-s3-configuration)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## About

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to upload images to an AWS S3 bucket. The application stores the image's URL in MongoDB and displays all uploaded images in a gallery. The backend is developed in Node.js using Express and Mongoose, while the frontend is created with React.

## Features

- Upload images directly to AWS S3
- Save image URLs in MongoDB
- Display uploaded images in a gallery format
- Handle file type and size validation
- Handle common errors like file upload failure, database connection issues, and more

## Tech Stack

**Frontend:**
- React
- Axios

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- AWS SDK (for S3)

**Database:**
- MongoDB

**File Storage:**
- AWS S3

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 12 or later)
- **npm** (version 6 or later)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **AWS S3 Bucket** (and IAM credentials)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-s3-upload.git
cd mern-s3-upload
```

### 2. Install Backend Dependencies

Navigate to the `backend` folder and install the required Node.js packages:

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Navigate to the `frontend` folder and install the required dependencies:

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

In the `backend` folder, create a `.env` file and add the following environment variables. Replace the placeholder values with your actual credentials and configuration.

```bash
# backend/.env

AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME=YOUR_S3_BUCKET_NAME
AWS_REGION=YOUR_S3_REGION
MONGO_URI=YOUR_MONGODB_URI
PORT=5000
```

### 5. Run the Backend Server

Go back to the `backend` folder and start the server:

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`.

### 6. Run the Frontend React Application

Navigate to the `frontend` folder and start the React development server:

```bash
cd ../frontend
npm start
```

The frontend app will run on `http://localhost:3000`.

---

## AWS S3 Configuration

1. **Create an AWS S3 Bucket:**
   - Log into your AWS account and navigate to S3.
   - Create a new bucket, making it public (or manage access using an appropriate policy).

2. **Create an IAM User:**
   - Go to AWS IAM and create a new user with `Programmatic Access`.
   - Assign the `AmazonS3FullAccess` policy or create a custom policy with restricted access to your bucket.

3. **Obtain the Access Key & Secret:**
   - After creating the IAM user, save the `Access Key ID` and `Secret Access Key`.
   - Use these credentials in your `.env` file for the backend.

---

## API Endpoints

### Upload Image

- **POST** `/api/upload`
- **Description**: Uploads an image to S3 and saves its URL to MongoDB.
- **Request Body**: `form-data` containing the image file.
  
Example request:

```bash
curl -X POST -F "image=@yourfile.jpg" http://localhost:5000/api/upload
```

### Fetch All Images

- **GET** `/api/images`
- **Description**: Fetches all image URLs stored in MongoDB.

Example response:

```json
[
  {
    "_id": "5f7f5f9e3d6c7100176eeb30",
    "url": "https://your-bucket.s3.amazonaws.com/1602156894120.png",
  },
  ...
]
```

---

## Error Handling

This app includes extensive error handling both on the server and the client. Common errors and their responses include:

1. **Missing File Error:**
   - If no file is uploaded, the API will return a `400 Bad Request` response with a message: `"No file uploaded"`.

2. **File Upload Error:**
   - If an error occurs during the file upload to S3, the API will return a `500 Internal Server Error` with a message: `"Failed to upload file"`.

3. **Database Connection Error:**
   - If the app cannot connect to MongoDB, it will log an error message to the console, and a `500 Internal Server Error` will be returned to the client.

4. **CORS Issues:**
   - The backend uses `cors` middleware to handle requests from the React frontend to avoid CORS issues during development.

---

## Error Logging

Errors on the server side are logged to the console for debugging. If you want to extend error logging to log files or external logging services like [Winston](https://github.com/winstonjs/winston) or [Sentry](https://sentry.io/), you can add them in the `catch` blocks of the API routes.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
