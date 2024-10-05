# expiration_monitor.py
import psycopg2
from datetime import datetime, timedelta

def check_expiring_products():
    try:
        conn = psycopg2.connect(database="inventory_db", user="dbuser", password="dbpass", host="localhost")
        cursor = conn.cursor()
        threshold_date = datetime.now() + timedelta(days=7)
        cursor.execute("SELECT product_name, expiration_date FROM inventory WHERE expiration_date <= %s", (threshold_date,))
        expiring_products = cursor.fetchall()
        for product in expiring_products:
            product_name, expiration_date = product
            print(f'Product "{product_name}" is expiring on {expiration_date}.')
            # Send alert via email or notification system
    except Exception as e:
        print(f'Error checking expiring products: {e}')
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    check_expiring_products()
