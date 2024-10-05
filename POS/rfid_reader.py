# rfid_reader.py
import serial
import time
import threading
from inventory_processor import process_rfid_data

def read_rfid_data(serial_port='/dev/ttyUSB0', baud_rate=9600):
    ser = serial.Serial(serial_port, baud_rate, timeout=1)
    print('RFID reader started.')
    while True:
        try:
            if ser.in_waiting:
                rfid_data = ser.readline().decode('utf-8').strip()
                if rfid_data:
                    print(f'Read RFID tag: {rfid_data}')
                    threading.Thread(target=process_rfid_data, args=(rfid_data,)).start()
            time.sleep(0.1)
        except Exception as e:
            print(f'Error reading RFID data: {e}')
            ser.close()
            time.sleep(5)
            ser.open()

if __name__ == '__main__':
    read_rfid_data()
