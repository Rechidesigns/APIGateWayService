const express = require('express')
const router = express.Router()
const axios = require('axios')
const { error } = require('console')
const app = express();

// Authentication Service (.NET Core API) URL
const authUrl = 'http://auth_service:80/api/authenticate';

// Product & Inventory Service (Django Rest Framework) URL
const productUrl = 'http://product_service:80/api/products/';

// API Gateway Endpoints
app.use('/auth', async (req, res) => {
  try {
    const response = await axios.post(authUrl, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to Authentication Service');
  }
});

app.use('/products', async (req, res) => {
  try {
    const response = await axios.get(productUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to Product & Inventory Service');
  }
});

app.listen(80, () => {
  console.log('API Gateway listening on port 80');
});


module.exports = router