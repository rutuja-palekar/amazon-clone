
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51O7vqrSDugAU6TkHLYw1lIaCO42VZtItqNgtU89vDc0Z32cGXOO0106CJsmrqx8C5pITn20tToQLAcQOK8FAxdmz007ulqRTL3');

const cors = require('cors'); 
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (request, response) => response.status(200).send("Hello World!"))

// Create a Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { total, currency } = req.body; 
    console.log('Received POST request to /create-payment-intent');
    console.log('Total:', total, 'Currency:', currency);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, 
      currency: "inr"
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
