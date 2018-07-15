import { Component,NgZone, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { NavController,Content } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  messages: any[]= [];
  text: string = "";
  api: string = "";
  @ViewChild(Content) content: Content;
 // @ViewChild('addMessage') addMessage:ElementRef;
  constructor(public navCtrl: NavController,public ngZone: NgZone,public tts:TextToSpeech,private _renderer: Renderer2) {

    /* this.messages.push({
      text: "Hi, how can i help you?",
      sender: "api"
    }); */
     this.api = " <ion-avatar item-left> + <img src='assets/apiai.png'> +</ion-avatar> + <div class='bubble me'>" + "HI, How are you" + "</div>";
    
  }

  @ViewChild("addMessage", {read: ElementRef}) addMessage: ElementRef;

  ngAfterViewInit(): void {
      // outputs `I am span`
      this._renderer.appendChild(this.addMessage.nativeElement, this.api);
      this._renderer.

      console.log(this.addMessage.nativeElement);
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
