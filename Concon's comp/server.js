// pos-server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let products = {
  '123456789012': { product_id: 1, barcode: '123456789012', product_name: 'Product A', price: 9.99 },
  '987654321098': { product_id: 2, barcode: '987654321098', product_name: 'Product B', price: 5.49 },
  // Add more products as needed
};

app.get('/api/products/:barcode', (req, res) => {
  const barcode = req.params.barcode;
  const product = products[barcode];
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.post('/api/checkout', async (req, res) => {
  const items = req.body.items;
  try {
    // Process payment logic here (e.g., integrate with payment gateway)
    
    // Update inventory in ERP
    for (const item of items) {
      await axios.post('https://erp.example.com/api/inventory/update', {
        product_id: item.product_id,
        quantity: -1 // Decrease by one
      });
    }
    res.send('Checkout successful');
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).send('Checkout failed');
  }
});

app.listen(PORT, () => {
  console.log(`POS server running on port ${PORT}`);
});
