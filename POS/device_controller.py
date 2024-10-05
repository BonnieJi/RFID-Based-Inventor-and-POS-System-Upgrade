# device_controller.py
import paho.mqtt.publish as publish
import time
import random

MQTT_BROKER = 'mqtt-broker.example.com'
MQTT_TOPIC = 'store/energy/device1'

def publish_energy_usage():
    while True:
        energy_consumption = random.uniform(100, 200)  # Simulate energy usage in watts
        payload = f'{energy_consumption:.2f}'
        publish.single(MQTT_TOPIC, payload, hostname=MQTT_BROKER)
        print(f'Published energy usage: {payload}W')
        time.sleep(5)  # Publish every 5 seconds

if __name__ == '__main__':
    publish_energy_usage()
