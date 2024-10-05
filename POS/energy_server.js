// energy_server.js
const mqtt = require('mqtt');
const express = require('express');
const app = express();
const PORT = 5000;

let energyData = [];

const mqttClient = mqtt.connect('mqtt://mqtt-broker.example.com');

mqttClient.on('connect', () => {
  mqttClient.subscribe('store/energy/#', (err) => {
    if (!err) {
      console.log('Subscribed to energy topics.');
    }
  });
});

mqttClient.on('message', (topic, message) => {
  const timestamp = new Date();
  const device = topic.split('/').pop();
  const consumption = parseFloat(message.toString());
  energyData.push({ timestamp, device, consumption });
  console.log(`Received data from ${device}: ${consumption}W at ${timestamp}`);
});

app.get('/api/energy', (req, res) => {
  res.json(energyData);
});

app.listen(PORT, () => {
  console.log(`Energy server running on port ${PORT}`);
});
