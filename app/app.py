# app.py
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.spinner import Spinner
from kivy.uix.label import Label

from jnius import autoclass
from android.permissions import request_permissions, Permission

import main  


BluetoothAdapter = autoclass('android.bluetooth.BluetoothAdapter')

class BluetoothApp(App):
    def build(self):
        request_permissions([
            Permission.BLUETOOTH,
            Permission.BLUETOOTH_ADMIN,
            Permission.ACCESS_FINE_LOCATION
        ])

        self.adapter = BluetoothAdapter.getDefaultAdapter()
        self.layout = BoxLayout(orientation='vertical', padding=10, spacing=10)

        self.status = Label(text='Select a Bluetooth device')
        self.layout.add_widget(self.status)

        self.spinner = Spinner(text='Choose device', size_hint=(1, 0.2))
        self.layout.add_widget(self.spinner)

        refresh_btn = Button(text='Refresh Devices')
        refresh_btn.bind(on_press=self.load_devices)
        self.layout.add_widget(refresh_btn)

        connect_btn = Button(text='Connect and Run main.py')
        connect_btn.bind(on_press=self.connect_and_run)
        self.layout.add_widget(connect_btn)

        return self.layout

    def load_devices(self, instance):
        paired_devices = self.adapter.getBondedDevices().toArray()
        self.devices = {device.getName(): device.getAddress() for device in paired_devices}
        self.spinner.values = list(self.devices.keys())
        self.status.text = 'Devices loaded.'

    def connect_and_run(self, instance):
        selected = self.spinner.text
        if selected in self.devices:
            address = self.devices[selected]
            self.status.text = f'Running main.py with {address}'
            main.run_task(address)  # Pass device address to your script
        else:
            self.status.text = 'Select a valid device first.'

if __name__ == '__main__':
    BluetoothApp().run()