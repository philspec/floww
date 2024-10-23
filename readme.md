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

   -Alternatively we have hosted the app on render free tier backend running on node and connected it to the Turso SQlite free tier db server. You can use this as a demo for the app before installing on your machine. 

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

## Database Interaction

This application uses the `@libsql/client` library for interacting with the SQLite database. The `db.js` file handles database connection and table creation.

For detailed information on the database syntax and available methods, refer to the `dbsyntax.md` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.
