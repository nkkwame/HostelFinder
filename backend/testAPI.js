const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing registration endpoint...');

        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890',
            role: 'user'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Success:', response.data);
    } catch (error) {
        console.log('Error:', error.response?.data || error.message);
        console.log('Status:', error.response?.status);
    }
}

testAPI();
