import { Component,NgZone, ViewChild} from '@angular/core';
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
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,public ngZone: NgZone,public tts:TextToSpeech) {

     this.messages.push({
      text: "<h3>Hi, how can i help you?</h3>",
      sender: "api"
    }); 
    
  }

  
  sendText(){
    let input = this.text;

    this.messages.push({
      text: input,
      sender: "me"
    });
    this.content.scrollToBottom(200);

    this.text = "";

    window["ApiAIPlugin"].requestText({
      query : input
    },
    (response)=>{
      this.ngZone.run(()=>{
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender: "api"
        });
        this.content.scrollToBottom(200);
      });
      this.tts.speak({
        text:response.result.fulfillment.speech,
        locale: "en-US",
        rate: 1
      });
    },
    (error)=>{
      alert(JSON.stringify(error));
    })
  }

  sendVoice(){
    window["ApiAIPlugin"].requestVoice({},
    (response)=>{
      this.tts.speak({
        text:response.result.fulfillment.speech,
        locale: "en-US",
        rate: 1
      });
      this.ngZone.run(()=>{
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender: "api"
        });
        this.content.scrollToBottom(200);
      })

    },
    (error)=>{
      alert(error);
    })
  }

}
