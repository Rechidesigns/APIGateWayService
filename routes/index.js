const express = require('express')
const router = express.Router()
const axios = require('axios')
const { error } = require('console')
const app = express();

//const authUrl = 'http://localhost:8090/api/';
const authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8090/api/';

// Product & Inventory Service (Django Rest Framework) URL
const productUrl = 'http://localhost:8000/api/v1/';

// Route for authentication service
app.post('/api/auth/register', async (req, res) => {
  try {
    const response = await axios.post(authUrl + 'Account/register', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    res.status(500).send('Error connecting to Authentication Service');
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(authUrl + 'Account/login', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    res.status(500).send('Error connecting to Authentication Service');
  }
});

app.post('/api/auth/refresh-token', async (req, res) => {
  try {
    const response = await axios.post(authUrl + 'Account/refresh-token', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    res.status(500).send('Error connecting to Authentication Service');
  }
});


app.post('/api/auth/change-password', async (req, res) => {
  try {
    const response = await axios.post(authUrl + 'Account/change-password', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    res.status(500).send('Error connecting to Authentication Service');
  }
});


app.post('/api/auth/logout', async (req, res) => {
  try {
    const accessToken = req.body.accessToken; // Extract the token from the request body
    const response = await axios.post(authUrl + 'Account/logout', req.body, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    if (error.response && error.response.status === 401) {
      res.status(401).send('Unauthorized');
    } else {
      res.status(500).send('Error connecting to Authentication Service');
    }
  }
});







// Route for product service
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(productUrl + 'products'); // Adjust endpoint as per your Django API
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Product & Inventory Service:', error.message);
    res.status(500).send('Error connecting to Product & Inventory Service');
  }
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});


module.exports = router