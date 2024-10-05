# reordering_system.py
import psycopg2
import requests

def reorder_low_stock_items():
    try:
        conn = psycopg2.connect(database="inventory_db", user="dbuser", password="dbpass", host="localhost")
        cursor = conn.cursor()
        cursor.execute("SELECT product_id, product_name, quantity FROM inventory WHERE quantity <= reorder_level")
        low_stock_items = cursor.fetchall()
        for item in low_stock_items:
            product_id, product_name, quantity = item
            # Send purchase order to supplier
            payload = {
                'product_id': product_id,
                'quantity': reorder_quantity
            }
            response = requests.post('https://supplier.example.com/api/orders', json=payload)
            if response.status_code == 200:
                print(f'Reorder placed for product {product_name}.')
            else:
                print(f'Failed to reorder product {product_name}: {response.text}')
    except Exception as e:
        print(f'Error in reordering system: {e}')
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    reorder_low_stock_items()
