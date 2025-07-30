# Full-Stack Real-Time Chat Application


![Chat App Screenshot](./image.png)

## Overview
A real-time chat application built with the MERN stack, featuring user authentication, real-time messaging, and online status tracking.

## Tech Stack
- **Frontend:** React, TailwindCSS, Daisy UI
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **WebSockets:** Socket.io for real-time communication
- **Authentication & Security:** JWT-based authentication
- **State Management:** Zustand
- **Error Handling:** Implemented both on the client and server

## Features
- Secure authentication and authorization with JWT
- Real-time messaging with Socket.io
- Online/offline user status tracking
- Optimized UI/UX with TailwindCSS and Daisy UI
- Robust error handling for a smooth experience

## Deployment
- **Live Application:** [Chat App](https://full-stack-chatapp-mern-97ho.onrender.com/)
- **GitHub Repository:** [Source Code](https://github.com/monireach2480/full-stack-chatAPP-MERN)

## Installation
To run this project locally, follow these steps:

### Prerequisites
- Node.js installed
- MongoDB database set up

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/monireach2480/full-stack-chatAPP-MERN.git
   cd full-stack-chatAPP-MERN
   ```
2. Install dependencies:
   ```sh
   npm install
   cd frontend && npm install
   cd backend && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root and add necessary configurations (e.g., database URI, JWT secret).
4. Start the development servers:
   ```sh
   npm run dev
   ```

## Contributing
Feel free to submit issues and pull requests to improve the application!

## License
This project is licensed under the MIT License.
