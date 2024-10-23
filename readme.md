# Floww - Expense Tracker API

## Description

Floww is a RESTful API for a simple expense tracker application. It allows users to manage their income, expenses, categories, and generate financial reports.

## Setup and Run Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/floww.git
   cd floww
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - This application uses `@libsql/client` to connect to a SQLite database.
   - If you want to run your local db, just replace the url in db connection to "file:your-db.db"
   - Create a `.env` file in the root directory and set the following environment variables:

     ```
     TURSO_DATABASE_URL= # Your Turso database URL
     TURSO_AUTH_TOKEN=  # Your Turso auth token
     JWT_SECRET=your-secret-key  # Secret key for JWT signing
     ```

4. **Start the server:**

   ```bash
   node app.js
   ```

   The API will be running at `http://localhost:3000`.

5. **Hosted service with free tier limits**

   -Alternatively we have hosted the app on render free tier backend running on node and connected it to the Turso SQlite free tier db server. You can use this as a demo for the app before installing on your machine. You can test it on postman. Here is the link to the backend

   [https://floww-xgo1.onrender.com] (Link to hosted api)

   >While using the above service, as it is hoted on render free tier, the instance spins down after 15 min of inactivity and may take upto 50 sec for a fresh cold start. So, please be patient while doing your first API request.

## API Documentation

### Authentication

#### **Register a new user**

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request body:**

  ```json
  {
    "username": "your-username",
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

- **Response:**

  - **Success (201 Created):**

    ```json
    {
      "message": "User registered successfully",
      "token": "your-jwt-token"
    }
    ```

  - **Error (400 Bad Request):** If validation fails or the email is already in use.

#### **Login**

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request body:**

  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "message": "Login successful",
      "token": "your-jwt-token"
    }
    ```

  - **Error (401 Unauthorized):** If invalid credentials are provided.

#### **Logout**

- **Endpoint:** `/auth/logout`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "message": "Logged out successfully"
    }
    ```

### Categories

#### **Get all categories**

- **Endpoint:** `/categories`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    [
      {
        "id": 1,
        "name": "Salary",
        "cat_type": "income"
      },
      {
        "id": 2,
        "name": "Groceries",
        "cat_type": "expense"
      },
      // ... more categories
    ]
    ```

#### **Create a new category**

- **Endpoint:** `/categories`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Request body:**

  ```json
  {
    "name": "New Category",
    "cat_type": "income" // or "expense"
  }
  ```

- **Response:**

  - **Success (201 Created):**

    ```json
    {
      "message": "Category created successfully",
      "categoryId": 123 // Newly created category ID
    }
    ```

  - **Error (400 Bad Request):** If validation fails.

### Transactions

#### **Get all transactions**

- **Endpoint:** `/transactions`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Query parameters:**
  - `page`: Page number (default: 1)
- **Response:**

  - **Success (200 OK):**

    ```json
    [
      {
        "id": 1,
        "trans_type": "expense",
        "category_id": 2,
        "user_id": 1,
        "amount": 50.25,
        "trans_date": "2024-10-22T17:08:47.000Z",
        "description": "Weekly groceries",
        "category_name": "Groceries"
      },
      // ... more transactions
    ]
    ```

#### **Get a single transaction**

- **Endpoint:** `/transactions/:id`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "id": 1,
      "trans_type": "expense",
      "category_id": 2,
      "user_id": 1,
      "amount": 50.25,
      "trans_date": "2024-10-22T17:08:47.000Z",
      "description": "Weekly groceries",
      "category_name": "Groceries"
    }
    ```

  - **Error (404 Not Found):** If the transaction is not found.

#### **Create a new transaction**

- **Endpoint:** `/transactions`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Request body:**

  ```json
  {
    "trans_type": "expense",
    "category_id": 2,
    "amount": 50.25,
    "description": "Weekly groceries"
  }
  ```

- **Response:**

  - **Success (201 Created):**

    ```json
    {
      "message": "Transaction created successfully",
      "transactionId": 123 // Newly created transaction ID
    }
    ```

  - **Error (400 Bad Request):** If validation fails.

#### **Update a transaction**

- **Endpoint:** `/transactions/:id`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Request body:**

  ```json
  {
    "trans_type": "expense",
    "category_id": 2,
    "amount": 60.00,
    "description": "Updated weekly groceries"
  }
  ```

- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "message": "Transaction updated successfully"
    }
    ```

  - **Error (404 Not Found):** If the transaction is not found.

#### **Delete a transaction**

- **Endpoint:** `/transactions/:id`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "message": "Transaction deleted successfully"
    }
    ```

  - **Error (404 Not Found):** If the transaction is not found.

### Reports

#### **Get financial summary**

- **Endpoint:** `/reports/summary`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "total_income": 1500.00,
      "total_expenses": 550.25,
      "balance": 949.75
    }
    ```

#### **Get monthly financial report**

- **Endpoint:** `/reports/monthly`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your-jwt-token`
- **Response:**

  - **Success (200 OK):**

    ```json
    {
      "period": "October 2024",
      "total_income": 1500.00,
      "total_expenses": 550.25,
      "balance": 949.75
    }
    ```
## Postman Screenshots 

## Image 1
![Image 1](https://drive.google.com/uc?export=view&id=10EInTk-OVWB127VblZuFDAhjFLaMvZ2K)

## Image 2
![Image 2](https://drive.google.com/uc?export=view&id=1GXXqv3RRxc7Uv0S-CbV881QuZ_otRcvJ)

## Image 3
![Image 3](https://drive.google.com/uc?export=view&id=19QN9Vy4UAxq1r6793-2QbB1ZZbBo80tp)

## Image 4
![Image 4](https://drive.google.com/uc?export=view&id=14peFigZ0jv77Q6e5dJWZBuFT6FVZ1m4u)

## Image 5
![Image 5](https://drive.google.com/uc?export=view&id=1vLxIa63i1h_ewarV6xBkFui3WkHkW7Jx)

## Image 6
![Image 6](https://drive.google.com/uc?export=view&id=1Unx4K24bDFmFueWXND2vy-Duz5UDZibb)

## Image 7
![Image 7](https://drive.google.com/uc?export=view&id=1bHrDsOIwZwjep87F4Tc-m5hfbML7HyBR)

## Image 8
![Image 8](https://drive.google.com/uc?export=view&id=10e23-TR1wu0mp9jRArlxB5_5vGCSbtiS)

## Image 9
![Image 9](https://drive.google.com/uc?export=view&id=10ZDiOdp19jijlOG8WQFL6wA8x_MQPqH-)

## Image 10
![Image 10](https://drive.google.com/uc?export=view&id=1AVHy5ijx1EV_2InxCLYIgZeK_U9U33nr)



## Database Interaction

This application uses the `@libsql/client` library for interacting with the SQLite database.

For detailed information on the database syntax and available methods, refer to the `dbsyntax.md` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.
