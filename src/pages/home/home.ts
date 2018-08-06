import { Component,NgZone} from '@angular/core';
import { NavController,Content } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  messages: any[]= [];
  text: string = "";
  constructor(public navCtrl: NavController,public ngZone: NgZone,public tts:TextToSpeech) {

     this.messages.push({
      text: "<h3>Hi, how can i help you?</h3>",
      sender: "api"
    }); 
    
  }

  

  

}
