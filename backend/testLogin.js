const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login endpoint...');

        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login Success:', response.data);
    } catch (error) {
        console.log('Login Error:', error.response?.data || error.message);
        console.log('Status:', error.response?.status);
    }
}

testLogin();
