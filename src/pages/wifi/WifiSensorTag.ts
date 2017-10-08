import {Component} from "@angular/core";
import {HTTP} from "@ionic-native/http";

@Component({
  selector: 'page-WifiSensorTag',
  templateUrl: 'WifiSensorTag.html'
})
export class WifiSensorTagPage {
  ambientTemperature: string = '0.00';
  irTemperature: string = '0.00';
  humidity: string = '0';
  pressure: string = '0';
  acceleration: string = 'X: 0.00 Y: 0.00 Z: 0.00';
  gyro: string = "X: 0.00 Y: 0.00 Z: 0.00";
  mag: string = "X: 0.00 Y: 0.00 Z: 0.00";
  keyPressed: string = '0';
  light: string = '0.0';
  ipAddress: string = '192.168.1.1';
  status: number;
  error: string;

  constructor(private http: HTTP) {

  }

  refreshEvent(event) {
    let parser = new DOMParser();

    this.http.get('http://'+ this.ipAddress +'/param_sensortag_poll.html', {}, {})
      .then(response => {

        this.status = response.status;
        this.error = "";

        // pares the html file
        let doc = parser.parseFromString(response.data, 'text/html');
        this.ambientTemperature = doc.getElementById('tmp').innerHTML.split(' ')[3];
        this.irTemperature = doc.getElementById('tmp').innerHTML.split(' ')[2];
        this.humidity = doc.getElementById('hum').innerHTML.split(' ')[2];
        this.pressure = doc.getElementById('bar').innerHTML.split(' ')[3];
        this.acceleration = 'X: ' + doc.getElementById('acc').innerHTML.split(' ')[3]
          + ' Y:' + doc.getElementById('acc').innerHTML.split(' ')[4]
          + ' Z: ' + doc.getElementById('acc').innerHTML.split(' ')[5];
        this.gyro = 'X: ' + doc.getElementById('gyr').innerHTML.split(' ')[3]
          + ' Y:' + doc.getElementById('gyr').innerHTML.split(' ')[4]
          + ' Z: ' + doc.getElementById('gyr').innerHTML.split(' ')[5];
        this.mag = 'X: ' + doc.getElementById('mag').innerHTML.split(' ')[3]
          + ' Y:' + doc.getElementById('mag').innerHTML.split(' ')[4]
          + ' Z: ' + doc.getElementById('mag').innerHTML.split(' ')[5];
        this.keyPressed = doc.getElementById('key').innerHTML;
        this.light = doc.getElementById('opt').innerHTML.split(' ')[1];

      })
      .catch(error => {

        this.status = error.status;
        this.error = error.error;

      });
  }
}
