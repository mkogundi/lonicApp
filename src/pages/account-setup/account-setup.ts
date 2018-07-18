import { Component,NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CongratulatePage } from '../congratulate/congratulate';
declare var window;
/**
 * Generated class for the AccountSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-setup',
  templateUrl: 'account-setup.html',
})
export class AccountSetupPage {

  messages: any[]= [];
  text: string = "";
  @ViewChild(Content) content: Content;
  @ViewChild('uploadPictureDiv', { read: ElementRef }) uploadPictureDiv:ElementRef;
  
  
  constructor(public navCtrl: NavController,private elRef:ElementRef, public navParams: NavParams,private camera: Camera,public ngZone: NgZone,public tts:TextToSpeech) {
    this.messages.push({
      text: "Hi, how can i help you?",
      sender: "api"
    }); 
  }

  public base64Image: string;
  public base64Selfie: string;
  public uploadPicture: boolean = false;
  public uploadSelfie: boolean = false;
  
  takeSelfie(){
    this.content.scrollToBottom(200);
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      allowEdit: false,
      correctOrientation: false,
      saveToPhotoAlbum: false,
      cameraDirection:1
      // mediaType: 0
    };
    this.camera.getPicture(options)
    .then((imageData)=>{
      this.base64Selfie = "data:image/jpeg;base64," + imageData;
      setTimeout(()=>{
        this.uploadSelfie = false;
        this.messages.push({
          text: "Thank You",
          sender: "api"
        });
        this.tts.speak({
          text:"Thank You",
          locale: "en-US",
          rate: 1
        });
      },2000)
    })
    .catch(err=>{
      console.log(err);
    })

  }

  takePicture(){
    this.content.scrollToBottom(200);
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      allowEdit: false,
      correctOrientation: false,
      saveToPhotoAlbum: false
      // mediaType: 0
    };
    this.camera.getPicture(options)
    .then((imageData)=>{
      this.base64Image = "data:image/jpeg;base64," + imageData;
      setTimeout(()=>{
        this.uploadPicture = false;
        this.messages.push({
          text: "We are retrieving your personal information",
          sender: "api"
        });
        this.tts.speak({
          text:"We are retrieving your personal information",
          locale: "en-US",
          rate: 1
        });
      },2000)
      this.callApiForDriverDetails();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  callApiForDriverDetails(){
    setTimeout(()=>{
      this.messages.push({
        text: "As per your driving licence i see that your first name is Soumitra Would you like me to call you as Soumitra?",
        sender: "api"
      });
      this.tts.speak({
        text:"As per your driving licence i see that your first name is Soumitra Would you like me to call you as Soumitra?",
        locale: "en-US",
        rate: 1
      });
    },2000);
  }

  sendText(){
    let input = this.text;
    this.text = "";
    this.messages.push({
      text: input,
      sender: "me"
    });
    window["ApiAIPlugin"].requestText({
      query : input
    },
    (response)=>{
      this.ngZone.run(()=>{    
        if(response.result.fulfillment.speech.indexOf('Personal Information') >= 0){ 
          this.messages.push({
            text: "Please Scan the BarCode at the back of your licence",
            sender: "api"
          });
          this.content.scrollToBottom(200);
          this.uploadPicture = true;
        } 
        else if(response.result.fulfillment.speech.indexOf('output1') >= 0){ 
          this.messages.push({
            text: "Okay,now how about a selfie with a smile",
            sender: "api"
          });
          this.content.scrollToBottom(200);
          this.uploadSelfie = true;
        }
        else if(response.result.fulfillment.speech.indexOf('Congratulations') >= 0){
          this.navigateAway();
         }
        else {
          this.messages.push({
            text: response.result.fulfillment.speech,
            sender: "api"
          });
          this.content.scrollToBottom(200);
        }
      });
      if(response.result.fulfillment.speech.indexOf('Personal Information') >= 0){ 
        this.tts.speak({
          text:"Please Scan the BarCode at the back of your licence",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('output1') >= 0){
        this.tts.speak({
          text:"Okay,now how about a selfie with a smile",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('iframe') >= 0){
        this.tts.speak({
          text:"Thank you i have compared your photo on the drivers licence and it matches Could you please review your account information below",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('Congratulations') >= 0){
        this.navigateAway();
       }
      else {
        this.tts.speak({
          text:response.result.fulfillment.speech,
          locale: "en-US",
          rate: 1
        });
      }  
    },
    (error)=>{
      alert(JSON.stringify(error));
    })
  }

  navigateAway(){
    this.navCtrl.setRoot(CongratulatePage);
  }

  sendVoice(){
    window["ApiAIPlugin"].requestVoice({},
    (response)=>{
     this.messages.push({
      text: response.result.resolvedQuery,
      sender: "me"
    });
      if(response.result.fulfillment.speech.indexOf('Personal Information') >= 0){
        this.tts.speak({
          text:"Please Scan the BarCode at the back of your licence",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('output1') >= 0){
        this.tts.speak({
          text:"Okay,now how about a selfie with a smile",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('iframe') >= 0){
        this.tts.speak({
          text:"Thank you i have compared your photo on the drivers licence and it matches Could you please review your account information below",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('Congratulations') >= 0){
       this.navigateAway();
      }
      else{
        this.tts.speak({
          text:response.result.fulfillment.speech,
          locale: "en-US",
          rate: 1
        });
      }
      
      this.ngZone.run(()=>{
        if(response.result.fulfillment.speech.indexOf('Personal Information') >= 0){
          this.messages.push({
            text: "Please Scan the BarCode at the back of your licence",
            sender: "api"
          });
          this.uploadPicture = true;
        }
        else if(response.result.fulfillment.speech.indexOf('output1') >= 0){ 
          this.messages.push({
            text: "Okay,now how about a selfie with a smile",
            sender: "api"
          });
          this.uploadSelfie = true;
        }
        else if(response.result.fulfillment.speech.indexOf('Congratulations') >= 0){
          this.navigateAway();
         }
        else{
          this.messages.push({
            text: response.result.fulfillment.speech,
            sender: "api"
          });
          this.content.scrollToBottom(200);
        }
      })

    },
    (error)=>{
      alert(error);
    })
  }


}
