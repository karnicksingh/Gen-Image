
# 🖼️ Gen-Image

> AI-powered text-to-image generation with secure cloud storage

Gen-Image is a full-stack web application that transforms text prompts into AI-generated images using the NVIDIA API, with secure user authentication and automatic cloud storage via AWS S3.

-----

## ✨ Features

- 🤖 **AI Image Generation** — Convert any text prompt into a high-quality image using NVIDIA’s text-to-image API
- 🔐 **JWT Authentication** — Secure user registration and login with JSON Web Tokens
- ☁️ **AWS S3 Storage** — Generated images are automatically uploaded and stored in the cloud
- ⚡ **Real-time Feedback** — Loading states, error handling, and instant image preview on the React frontend
- 📱 **Responsive UI** — Clean, mobile-friendly interface built with React.js

-----

## 🛠️ Tech Stack

|Layer          |Technology                   |
|---------------|-----------------------------|
|Frontend       |React.js                     |
|Backend        |Node.js, Express.js          |
|Authentication |JWT (JSON Web Tokens), bcrypt|
|AI API         |NVIDIA Text-to-Image API     |
|Cloud Storage  |AWS S3                       |
|Package Manager|npm                          |

-----

## 📁 Project Structure

```
Gen-Image/
├── client/          # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
├── server/          # Node.js + Express backend
│   ├── routes/
│   ├── middleware/  # JWT auth middleware
│   ├── controllers/
│   └── index.js
├── .gitignore
└── package-lock.json
```

-----

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm
- AWS account with S3 bucket configured
- NVIDIA API key

### Installation

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/karnicksingh/Gen-Image.git
   cd Gen-Image
   ```
1. **Install server dependencies**
   
   ```bash
   cd server
   npm install
   ```
1. **Install client dependencies**
   
   ```bash
   cd ../client
   npm install
   ```
1. **Set up environment variables**
   
   Create a `.env` file inside the `server/` directory:
   
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   NVIDIA_API_KEY=your_nvidia_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   AWS_REGION=your_aws_region
   ```
1. **Run the app**
   
   Start backend:
   
   ```bash
   cd server
   npm start
   ```
   
   Start frontend:
   
   ```bash
   cd client
   npm start
   ```
1. Open `http://localhost:3000` in your browser

-----

## 🔑 API Endpoints

|Method|Endpoint            |Description               |Auth Required|
|------|--------------------|--------------------------|-------------|
|POST  |`/api/auth/register`|Register a new user       |❌            |
|POST  |`/api/auth/login`   |Login and receive JWT     |❌            |
|POST  |`/api/generate`     |Generate image from prompt|✅            |
|GET   |`/api/images`       |Fetch user’s saved images |✅            |

-----

## 🚧 Status

This project is actively under development. Core features (authentication, NVIDIA API integration, AWS S3 upload) are functional. Upcoming additions:

- Image history gallery per user
- Prompt suggestions
- Image download option

-----

## 👤 Author

**Karnick Singh**  
[GitHub](https://github.com/karnicksingh) • [LinkedIn](https://linkedin.com/in/karnicksingh)
