import { Component,NgZone} from '@angular/core';
import { NavController,Content, Events, NavParams } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  messages: any[]= [];
  text: string = "";
  userName;
  constructor(public navCtrl: NavController,public navParams: NavParams,public ngZone: NgZone,public tts:TextToSpeech,public events:Events) {

     this.messages.push({
      text: "<h3>Hi, how can i help you?</h3>",
      sender: "api"
    }); 

    this.userName = navParams.get('data').givenName;
    
  }

  

  

}
