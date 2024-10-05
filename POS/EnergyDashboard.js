// energy-dashboard/src/EnergyDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnergyDashboard() {
  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/energy')
      .then(response => {
        setEnergyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching energy data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Energy Consumption Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Device</th>
            <th>Consumption (W)</th>
          </tr>
        </thead>
        <tbody>
          {energyData.map((data, index) => (
            <tr key={index}>
              <td>{new Date(data.timestamp).toLocaleString()}</td>
              <td>{data.device}</td>
              <td>{data.consumption}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnergyDashboard;
