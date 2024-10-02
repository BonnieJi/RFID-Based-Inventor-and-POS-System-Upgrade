// pos-app/src/components/POS.js
import React, { useState } from 'react';
import axios from 'axios';

function POS() {
  const [barcode, setBarcode] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleScan = (e) => {
    e.preventDefault();
    axios.get(`/api/products/${barcode}`)
      .then(response => {
        const product = response.data;
        setCartItems([...cartItems, product]);
        setBarcode('');
      })
      .catch(error => {
        alert('Product not found');
        console.error(error);
      });
  };

  const handleCheckout = () => {
    axios.post('/api/checkout', { items: cartItems })
      .then(response => {
        alert('Checkout successful');
        setCartItems([]);
      })
      .catch(error => {
        alert('Checkout failed');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>POS System</h1>
      <form onSubmit={handleScan}>
        <input
          type="text"
          value={barcode}
          onChange={e => setBarcode(e.target.value)}
          placeholder="Scan Barcode"
        />
        <button type="submit">Add to Cart</button>
      </form>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.product_name} - ${item.price}</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default POS;
