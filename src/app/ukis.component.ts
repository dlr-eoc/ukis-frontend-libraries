import { Component } from '@angular/core';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis enim aliquid mollitia odio?';

@Component({
  selector: 'ukis-root',
  templateUrl: './ukis.component.html',
  styleUrls: ['./ukis.component.css']
})
export class UkisComponent {
  title = 'ukis';

  alert;


  setAlert = (type: string = 'info') => {
    console.log(type);
    // structure of (app-level) alert
    // TODO use shared service
    this.alert = {
      type: type || 'info',
      text: `<strong>Alert-Type: ${type.toUpperCase()}</strong> ${lorem}`,
      closeable: true,
      actions: [
        {
          title: 'ACTION',
          callback: () => {
            console.log('received click');
          }
        }]
    };
  }


}
