# inventory_processor.py
import psycopg2
from datetime import datetime
import requests

def update_erp_inventory(product_id, quantity):
    erp_api_url = 'https://erp.example.com/api/inventory/update'
    payload = {
        'product_id': product_id,
        'quantity': quantity
    }
    try:
        response = requests.post(erp_api_url, json=payload)
        response.raise_for_status()
        print(f'ERP inventory updated for product {product_id}.')
    except requests.RequestException as e:
        print(f'Failed to update ERP inventory: {e}')

def process_rfid_data(rfid_tag):
    try:
        conn = psycopg2.connect(database="inventory_db", user="dbuser", password="dbpass", host="localhost")
        cursor = conn.cursor()
        # Check if RFID tag exists
        cursor.execute("SELECT product_id, quantity FROM inventory WHERE rfid_tag = %s", (rfid_tag,))
        result = cursor.fetchone()
        if result:
            product_id, quantity = result
            new_quantity = quantity + 1  # Adjust logic as needed
            cursor.execute(
                "UPDATE inventory SET quantity = %s, last_updated = %s WHERE product_id = %s",
                (new_quantity, datetime.now(), product_id)
            )
            conn.commit()
            print(f'Inventory updated for product {product_id}, new quantity: {new_quantity}')
            # Update ERP system
            update_erp_inventory(product_id, new_quantity)
        else:
            print(f'RFID tag {rfid_tag} not recognized. Adding new product.')
            # Add new product logic here
            # cursor.execute(...)
            # conn.commit()
    except Exception as e:
        print(f'Error processing RFID data: {e}')
    finally:
        cursor.close()
        conn.close()
