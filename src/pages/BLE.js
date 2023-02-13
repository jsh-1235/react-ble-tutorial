export default class BLE {
  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }

  requestDevice(onDisconnected) {
    let options = {
      filters: [
        {
          name: "BLE_TEST",
        },
      ],
      optionalServices: [0xfff0], // Required to access service later.
    };

    return navigator.bluetooth.requestDevice(options).then((device) => {
      this.device = device;

      // this.device.addEventListener("gattserverdisconnected", this.onDisconnected);

      this.device.addEventListener("gattserverdisconnected", onDisconnected);
    });
  }

  connect() {
    if (!this.device) {
      return Promise.reject("Device is not connected.");
    }

    console.log("Device is connecting ...");

    return this.device.gatt.connect();
  }

  writeData(data) {
    return this.device.gatt
      .getPrimaryService(0xfff0)
      .then((service) => service.getCharacteristic(0xfff2))
      .then((characteristic) => characteristic.writeValue(data));
  }

  startDataNotifications(listener) {
    console.log("startNotificationNotifications");

    return this.device.gatt
      .getPrimaryService(0xfff0)
      .then((service) => service.getCharacteristic(0xfff1))
      .then((characteristic) => characteristic.startNotifications())
      .then((characteristic) => {
        characteristic.addEventListener("characteristicvaluechanged", listener);
      });
  }

  stopDataNotifications(listener) {
    return this.device.gatt
      .getPrimaryService(0xfff0)
      .then((service) => service.getCharacteristic(0xfff1))
      .then((characteristic) => characteristic.stopNotifications())
      .then((characteristic) => characteristic.removeEventListener("characteristicvaluechanged", listener));
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject("Device is not connected.");
    }

    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log("Device is disconnected.");
  }
}
