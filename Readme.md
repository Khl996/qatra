# Qatra Backend Documentation

## Project Overview
Qatra is a loyalty program application that connects users with stores. Users can earn points and redeem them for offers and discounts, while stores can analyze customer behavior and incentivize loyalty.

## Installation and Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install [PostgreSQL](https://www.postgresql.org/).
3. Set up a `.env` file with the following variables:

```
DB_NAME=qatra-app
DB_USER=postgres
DB_PASSWORD=Khld5452
DB_HOST=localhost
PORT=4000
JWT_SECRET=2kVmNc9G8@M29gLP$x!aR5mZqTbL3&x0WqLr%^5HgNvDp7xKJr9FtBQ3NvZL7X
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email@example.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

### Steps to Run the Backend Locally
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/qatra-backend.git
   cd qatra-backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run Database Migrations:**
   ```bash
   node utils/syncDatabase.js
   ```
4. **Start the Server:**
   ```bash
   npm start
   ```
5. **Access the API:**
   The backend will be running on `http://172.20.10.4:4000`.

## API Endpoints

### Authentication
- **Register:** `POST /api/users/register`
- **Login:** `POST /api/users/login`

### Users
- **Get User Points:** `GET /api/points/user/:userId`

### Stores
- **Create Store:** `POST /api/stores/create`
- **Get Store Offers:** `GET /api/stores/:storeId/offers`

### Offers
- **Create Offer:** `POST /api/offers/create`
- **Get All Offers:** `GET /api/offers`
- **Get Store Offers:** `GET /api/offers/store/:storeId`

### Support
- **Send Support Request:** `POST /api/support/request`

## Deployment
1. **Using Docker:**
   - Build and run the container:
     ```bash
     docker-compose up --build
     ```
2. **Heroku or AWS:**
   - Follow respective deployment steps for your platform.

## Testing
- **Run Unit Tests:**
  ```bash
  npm test
  ```

## Contributing
- Fork the repository and submit a pull request.
- Ensure all tests pass before submission.

## License
This project is licensed under the MIT License.
