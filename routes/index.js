const express = require('express')
const router = express.Router()
const axios = require('axios')
const { error } = require('console')
const app = express();

const authUrl = 'http://localhost:8090/api/';

// Product & Inventory Service (Django Rest Framework) URL
const productUrl = 'http://localhost:8000/api/v1/';

// Route for authentication service
app.post('/api/authenticate', async (req, res) => {
  try {
    const response = await axios.post(authUrl + 'authenticate', req.body); // Adjust endpoint as per your .NET Core API
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to Authentication Service:', error.message);
    res.status(500).send('Error connecting to Authentication Service');
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


app.listen(80, () => {
  console.log('API Gateway listening on port 80');
});


module.exports = router