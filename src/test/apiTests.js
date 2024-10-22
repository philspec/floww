import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
let authToken = '';
let testTransactionId = '';

const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) })
  });
  return await response.json();
}

async function runTests() {
  try {
    // 1. Auth Tests
    console.log('\n🔑 Testing Authentication Endpoints...');
    
    // Register
    console.log('\nTesting Register:');
    const registerResponse = await apiCall('/auth/register', 'POST', testUser);
    console.log(registerResponse);

    // Login
    console.log('\nTesting Login:');
    const loginResponse = await apiCall('/auth/login', 'POST', {
      email: testUser.email,
      password: testUser.password
    });
    console.log(loginResponse);
    authToken = loginResponse.token;

    // 2. Category Tests
    console.log('\n📁 Testing Category Endpoints...');
    
    // Create categories
    console.log('\nCreating Categories:');
    const categories = [
      { name: 'Salary', cat_type: 'income' },
      { name: 'Groceries', cat_type: 'expense' },
      { name: 'Rent', cat_type: 'expense' }
    ];

    for (const category of categories) {
      const categoryResponse = await apiCall('/categories', 'POST', category, authToken);
      console.log(categoryResponse);
    }

    // Get all categories
    console.log('\nGetting All Categories:');
    const allCategories = await apiCall('/categories', 'GET', null, authToken);
    console.log(allCategories);

    // 3. Transaction Tests
    console.log('\n💰 Testing Transaction Endpoints...');
   
    // Create transaction
    console.log('\nCreating Transaction:');
    const newTransaction = {
      trans_type: 'expense',
      category_id: 2, // Using Groceries category
      amount: 50.25,
      description: 'Weekly groceries'
    };
    const createTransResponse = await apiCall('/transactions', 'POST', newTransaction, authToken);
    console.log(createTransResponse);
    testTransactionId = createTransResponse.transactionId;
    console.log("testTransactionId:", createTransResponse)

    // Get all transactions
    console.log('\nGetting All Transactions:');
    const allTransactions = await apiCall('/transactions', 'GET', null, authToken);
    console.log(allTransactions);

    // Get single transaction
    console.log('\nGetting Single Transaction:');
    const singleTransaction = await apiCall(`/transactions/${testTransactionId}`, 'GET', null, authToken);
    console.log(singleTransaction);

    // Update transaction
    console.log('\nUpdating Transaction:');
    const updateData = {
      trans_type: 'expense',
      category_id: 2,
      amount: 55.25,
      description: 'Updated weekly groceries'
    };
    const updateResponse = await apiCall(`/transactions/${testTransactionId}`, 'PUT', updateData, authToken);
    console.log(updateResponse);

    // 4. Report Tests
    console.log('\n📊 Testing Report Endpoints...');
    
    // Get summary
    console.log('\nGetting Summary:');
    const summary = await apiCall('/summary', 'GET', null, authToken);
    console.log(summary);
 

    // 5. Cleanup
    console.log('\n🧹 Cleanup Tests...');
    
    // Delete transaction
    console.log('\nDeleting Transaction:');
    const deleteResponse = await apiCall(`/transactions/${testTransactionId}`, 'DELETE', null, authToken);
    console.log(deleteResponse);

    // Logout
    console.log('\nTesting Logout:');
    const logoutResponse = await apiCall('/auth/logout', 'POST', null, authToken);
    console.log(logoutResponse);

  } catch (error) {
    console.error('Error during tests:', error);
  }
}



runTests();