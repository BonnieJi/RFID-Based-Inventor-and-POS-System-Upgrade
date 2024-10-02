# RFID-Based-Inventor-and-POS-System-Upgrade
RFID-Based Inventory Tracking System and  POS System Upgrade
# **Las Palmas Inventory Management and POS System**

---

## **Overview**

This README provides comprehensive instructions for setting up and running the RFID-based Inventory Tracking System, POS System Upgrade, Energy-Efficient Solutions, and additional features developed for Las Palmas stores. The systems are designed to enhance inventory management, improve customer experience, and increase operational efficiency.

---

## **Table of Contents**

1. [System Requirements](#system-requirements)
2. [Installation Instructions](#installation-instructions)
   - [1. RFID-Based Inventory Tracking System](#1-rfid-based-inventory-tracking-system)
   - [2. POS System Upgrade](#2-pos-system-upgrade)
   - [3. Energy-Efficient Solutions](#3-energy-efficient-solutions)
   - [4. Additional Features](#4-additional-features)
3. [Usage Instructions](#usage-instructions)
   - [1. Running the RFID Inventory System](#1-running-the-rfid-inventory-system)
   - [2. Running the POS System](#2-running-the-pos-system)
   - [3. Running the Energy Management System](#3-running-the-energy-management-system)
   - [4. Running Additional Features](#4-running-additional-features)
4. [Code Structure and Explanation](#code-structure-and-explanation)
5. [Security Considerations](#security-considerations)
6. [Next Steps](#next-steps)
7. [Contact Information](#contact-information)

---

## **System Requirements**

### **Hardware Requirements**

- **RFID Hardware:**
  - RFID tags
  - RFID readers (compatible with your system)
- **Servers and Devices:**
  - A server to run backend applications
  - POS terminals (modern touch-screen devices)
  - IoT devices for energy management (smart meters, sensors)
  
### **Software Requirements**

- **Operating System:**
  - Linux-based OS (Ubuntu 18.04 or later recommended)
- **Programming Languages and Frameworks:**
  - Python 3.6+
  - Node.js 14+
  - React 17+
- **Databases:**
  - PostgreSQL 10+
- **Additional Software:**
  - MQTT Broker (e.g., Mosquitto)
  - Git (for version control)
  
### **Prerequisite Installations**

- **Python Packages:** `pyserial`, `psycopg2`, `requests`, `paho-mqtt`
- **Node.js Packages:** `express`, `body-parser`, `axios`, `cors`, `mqtt`
- **React Packages:** `axios`, `react-router-dom`

---

## **Installation Instructions**

### **1. RFID-Based Inventory Tracking System**

#### **Step 1: Install Python and Required Libraries**

```bash
sudo apt-get update
sudo apt-get install python3 python3-pip
pip3 install pyserial psycopg2 requests
```

#### **Step 2: Set Up PostgreSQL Database**

```bash
sudo apt-get install postgresql postgresql-contrib
sudo -i -u postgres
createuser dbuser -P
createdb inventory_db -O dbuser
exit
```

#### **Step 3: Create Inventory Table**

Create a file named `inventory.sql` with the following content:

```sql
CREATE TABLE inventory (
    product_id SERIAL PRIMARY KEY,
    rfid_tag VARCHAR(128) UNIQUE NOT NULL,
    product_name VARCHAR(255),
    quantity INT DEFAULT 0,
    location VARCHAR(255),
    expiration_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Execute the SQL script:

```bash
psql -U dbuser -d inventory_db -f inventory.sql
```

#### **Step 4: Install and Configure RFID Reader**

- Connect the RFID reader to the server via USB.
- Ensure the device is recognized (e.g., `/dev/ttyUSB0`).

#### **Step 5: Download and Configure the Python Scripts**

Create a directory for the RFID system:

```bash
mkdir rfid_inventory_system
cd rfid_inventory_system
```

Create `rfid_reader.py`:

```python
# Content from the provided rfid_reader.py script
```

Create `inventory_processor.py`:

```python
# Content from the provided inventory_processor.py script
```

---

### **2. POS System Upgrade**

#### **Step 1: Install Node.js and NPM**

```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### **Step 2: Set Up Backend Server**

Create a directory for the POS server:

```bash
mkdir pos_server
cd pos_server
npm init -y
npm install express body-parser axios cors
```

Create `server.js` with the provided content.

#### **Step 3: Set Up Frontend Application**

Navigate back to the root directory and create the React app:

```bash
npx create-react-app pos_app
cd pos_app
npm install axios react-router-dom
```

Replace `src/App.js` and add `src/components/POS.js` with the provided content.

---

### **3. Energy-Efficient Solutions**

#### **Step 1: Install MQTT Broker**

```bash
sudo apt-get install mosquitto mosquitto-clients
```

#### **Step 2: Configure MQTT Broker**

- Edit `/etc/mosquitto/mosquitto.conf` if necessary.
- Start the broker:

```bash
sudo systemctl start mosquitto
sudo systemctl enable mosquitto
```

#### **Step 3: Set Up IoT Device Scripts**

Create `device_controller.py`:

```python
# Content from the provided device_controller.py script
```

Install required Python package:

```bash
pip3 install paho-mqtt
```

#### **Step 4: Set Up Energy Server**

Create a directory for the energy server:

```bash
mkdir energy_server
cd energy_server
npm init -y
npm install express mqtt cors
```

Create `energy_server.js` with the provided content.

#### **Step 5: Create Energy Dashboard**

Navigate back to the root directory and create a React app:

```bash
npx create-react-app energy_dashboard
cd energy_dashboard
npm install axios react-router-dom
```

Add `src/EnergyDashboard.js` with the provided content.

---

### **4. Additional Features**

#### **a. Expiration Date Monitoring**

Create `expiration_monitor.py`:

```python
# Content from the provided expiration_monitor.py script
```

Set up a cron job:

```bash
crontab -e
```

Add the following line to run the script daily at 9 AM:

```bash
0 9 * * * /usr/bin/python3 /path/to/expiration_monitor.py
```

#### **b. Automated Reordering System**

Create `reordering_system.py`:

```python
# Content from the provided reordering_system.py script
```

Schedule the script to run as needed using cron.

#### **c. Customer Loyalty Program**

Modify `server.js` in the POS server to include loyalty program endpoints as provided.

---

## **Usage Instructions**

### **1. Running the RFID Inventory System**

#### **Step 1: Start the RFID Reader Script**

```bash
cd rfid_inventory_system
python3 rfid_reader.py
```

Ensure the RFID reader is connected and the serial port in `rfid_reader.py` matches your device.

### **2. Running the POS System**

#### **Step 1: Start the Backend Server**

```bash
cd pos_server
node server.js
```

#### **Step 2: Start the Frontend Application**

In a new terminal:

```bash
cd pos_app
npm start
```

Access the POS system at `http://localhost:3000` in your web browser.

### **3. Running the Energy Management System**

#### **Step 1: Start the MQTT Broker**

```bash
sudo systemctl start mosquitto
```

#### **Step 2: Start the IoT Device Script**

```bash
python3 device_controller.py
```

#### **Step 3: Start the Energy Server**

In a new terminal:

```bash
cd energy_server
node energy_server.js
```

#### **Step 4: Start the Energy Dashboard**

In a new terminal:

```bash
cd energy_dashboard
npm start
```

Access the dashboard at `http://localhost:3000`.

### **4. Running Additional Features**

#### **a. Expiration Date Monitoring**

The `expiration_monitor.py` script runs daily via cron. To run manually:

```bash
python3 expiration_monitor.py
```

#### **b. Automated Reordering System**

Run the script as needed:

```bash
python3 reordering_system.py
```

#### **c. Customer Loyalty Program**

The loyalty program is integrated into the POS system and runs automatically during checkout.

---

## **Code Structure and Explanation**

### **1. RFID Inventory System**

- **rfid_reader.py:** Listens to the RFID reader, reads RFID tags, and passes the data to `inventory_processor.py`.
- **inventory_processor.py:** Processes the RFID data, updates the PostgreSQL database, and communicates with the ERP system via API.

### **2. POS System**

- **server.js (Backend):** Handles product lookup, checkout processing, inventory updates, and loyalty points.
- **App.js and POS.js (Frontend):** Provides the user interface for the POS system, allowing staff to scan products and process transactions.

### **3. Energy Management System**

- **device_controller.py (IoT Device):** Simulates energy consumption data and publishes it to the MQTT broker.
- **energy_server.js:** Subscribes to MQTT topics, collects energy data, and provides an API endpoint for the dashboard.
- **EnergyDashboard.js:** Displays energy consumption data in a table format.

### **4. Additional Features**

- **expiration_monitor.py:** Checks for products nearing expiration and alerts staff.
- **reordering_system.py:** Identifies low-stock items and automates the reordering process.
- **Loyalty Program Integration:** Adds loyalty points to customer accounts during the checkout process.

---

## **Security Considerations**

- **Database Credentials:** Store sensitive information like database passwords in environment variables or configuration files secured with appropriate permissions.
- **API Keys and Tokens:** Secure all API communications with authentication tokens and HTTPS.
- **Input Validation:** Sanitize all inputs to prevent SQL injection and other vulnerabilities.
- **User Authentication:** Implement authentication mechanisms for accessing the POS system and dashboards.
- **Data Encryption:** Encrypt sensitive data in transit and at rest.

---

## **Next Steps**

1. **Customize the Code:**
   - Adapt scripts to match specific hardware models and ERP APIs.
   - Localize applications with bilingual support.

2. **Enhance Features:**
   - Implement detailed error handling and logging.
   - Integrate advanced analytics and reporting tools.

3. **Deploy Applications:**
   - Use Docker for containerization.
   - Deploy on cloud platforms for scalability.

4. **Testing:**
   - Write unit and integration tests.
   - Conduct user acceptance testing.

5. **Training and Documentation:**
   - Develop user manuals and technical documentation.
   - Provide training sessions for staff.

---

## **Contact Information**

For further assistance or inquiries:

- **Development Team Lead:** Bonnie Ji 


---

**Note:** This README provides a foundational guide for setting up and running the systems. Adjustments may be necessary based on specific hardware, software versions, and organizational requirements.
