import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { Camera } from '../../../node_modules/@ionic-native/camera';
import { TextToSpeech } from '../../../node_modules/@ionic-native/text-to-speech';
import { CongratulatePage } from '../congratulate/congratulate';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FingerprintAIO, FingerprintOptions } from '../../../node_modules/@ionic-native/fingerprint-aio';

/**
 * Generated class for the OrderEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-entry',
  templateUrl: 'order-entry.html',
})
export class OrderEntryPage {

  
  messages: any[]= [];
  text: string = "";
  @ViewChild(Content) content: Content;
  @ViewChild('uploadPictureDiv', { read: ElementRef }) uploadPictureDiv:ElementRef;
  
  fingerprintOptions: FingerprintOptions;
  constructor(public navCtrl: NavController,private elRef:ElementRef, public navParams: NavParams,private camera: Camera,public ngZone: NgZone,public tts:TextToSpeech,public http: Http,private platform: Platform,private fingerprint: FingerprintAIO) {
    this.messages.push({
      text: "please help me with the details",
      sender: "api"
    }); 
  //  this.callApiForOrderDetails();

    this.fingerprintOptions = {
      clientId: 'IonicAI',
      clientSecret: 'password',
      disableBackup: true
    };
  }

  public base64Image: string;
  public base64Selfie: string;
  public uploadPicture: boolean = false;
  public uploadSelfie: boolean = false;
  statement: string;
  
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


  callApiForOrderDetails(speech){
    this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=X9EBN7HTIC5W6TE1').map(res => res.json()).subscribe(data => {

    let Quantity = 20;
    let action = "Buy";
    let timeKey = data["Meta Data"]["3. Last Refreshed"];
    let price = data["Time Series (1min)"][timeKey]["4. close"];
    let totalAmount = (parseFloat(price) * Quantity).toFixed(2);
    this.statement = "Please confirm the  order details below";
    });
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
        if(response.result.fulfillment.speech.indexOf('buy') >= 0 || response.result.fulfillment.speech.indexOf('Buy') >= 0){
          this.messages.push({
            text: "Okay and will this be a market or limit order",
            sender: "api"
          });
        }
        else if(response.result.fulfillment.speech.indexOf('market') >= 0 || response.result.fulfillment.speech.indexOf('Market') >= 0 ){
          this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=X9EBN7HTIC5W6TE1').map(res => res.json()).subscribe(data => {
  
            let Quantity = 20;
            let action = "Buy";
            let timeKey = data["Meta Data"]["3. Last Refreshed"];
            let price = data["Time Series (1min)"][timeKey]["4. close"];
            let totalAmount = parseFloat(price) * Quantity;
            this.statement = "Please confirm the order details below";
            this.messages.push({
              text: this.statement,
              sender: "api"
            });

            setTimeout(()=>{
              this.showFingerPrintDailog();
            },2000)
            //alert(this.statement);
        });
        }
        else if(response.result.resolvedQuery.indexOf('looks good') >= 0){
          this.messages.push({
            text: "Your Order has been placed successfully",
            sender: "api"
          });
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

      if(response.result.fulfillment.speech.indexOf('buy') >= 0 || response.result.fulfillment.speech.indexOf('Buy') >= 0 ){
        this.tts.speak({
          text:"Okay and will this be a market or limit order",
          locale: "en-US",
          rate: 1
        });  
      }
      else if(response.result.fulfillment.speech.indexOf('market') >= 0 ||response.result.fulfillment.speech.indexOf('Market') >= 0  ){
        this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=X9EBN7HTIC5W6TE1').map(res => res.json()).subscribe(data => {

          let Quantity = 20;
          let action = "Buy";
          let timeKey = data["Meta Data"]["3. Last Refreshed"];
          let price = data["Time Series (1min)"][timeKey]["4. close"];
          let totalAmount = parseFloat(price) * Quantity;
          this.statement = "Please confirm order details below";
          this.tts.speak({
            text:this.statement,
            locale: "en-US",
            rate: 1
          });
          //alert(this.statement);
      });
      }
      else if(response.result.resolvedQuery.indexOf('looks good') >= 0){
        this.tts.speak({
          text:"Your Order has been placed successfully",
          locale: "en-US",
          rate: 1
        });
        this.navigateAway();
      }  
    },
    (error)=>{
      alert(JSON.stringify(error));
    })
  }

  navigateAway(){
    this.navCtrl.setRoot(CongratulatePage,{data:'orderplaced'});
  }

  async showFingerPrintDailog(){
    try {
        await this.platform.ready();
        const available = await this.fingerprint.isAvailable();
        if(available === 'finger'){
          const result = await this.fingerprint.show(this.fingerprintOptions);
          if (result != ''){
           
           this.tts.speak({
            text:"Your Order has been placed successfully",
            locale: "en-US",
            rate: 1
          });
          this.navCtrl.push(CongratulatePage);
          }
        }
    } catch (error) {
      console.log(error)
    }
    
  }

  sendVoice(){
    window["ApiAIPlugin"].requestVoice({},
    (response)=>{
     this.messages.push({
      text: response.result.resolvedQuery,
      sender: "me"
    });
      if(response.result.fulfillment.speech.indexOf('buy') >= 0){
        this.tts.speak({
          text:"Okay and will this be a market or limit order",
          locale: "en-US",
          rate: 1
        });  
      }
      else if(response.result.fulfillment.speech.indexOf('market') >= 0){
        this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=X9EBN7HTIC5W6TE1').map(res => res.json()).subscribe(data => {

          let Quantity = 20;
          let action = "Buy";
          let timeKey = data["Meta Data"]["3. Last Refreshed"];
          let price = data["Time Series (1min)"][timeKey]["4. close"];
          let totalAmount = parseFloat(price) * Quantity;
          this.statement = "Please confirm order details below";
          this.tts.speak({
            text:this.statement,
            locale: "en-US",
            rate: 1
          });
          //alert(this.statement);
      });
      }
      else if(response.result.resolvedQuery.indexOf('looks good') >= 0){
        this.tts.speak({
          text:"Your Order has been placed successfully",
          locale: "en-US",
          rate: 1
        });
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
        if(response.result.fulfillment.speech.indexOf('buy') >= 0){
          this.messages.push({
            text: "Okay and will this be a market or limit order",
            sender: "api"
          });
        }
        else if(response.result.fulfillment.speech.indexOf('market') >= 0){
          this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=X9EBN7HTIC5W6TE1').map(res => res.json()).subscribe(data => {
  
            let Quantity = 20;
            let action = "Buy";
            let timeKey = data["Meta Data"]["3. Last Refreshed"];
            let price = data["Time Series (1min)"][timeKey]["4. close"];
            let totalAmount = parseFloat(price) * Quantity;
            this.statement = "Please confirm order details below";
            this.messages.push({
              text: this.statement,
              sender: "api"
            });

            this.showFingerPrintDailog();
            //alert(this.statement);
        });
        }
        else if(response.result.resolvedQuery.indexOf('looks good') >= 0){
          this.messages.push({
            text: "Your Order has been placed successfully",
            sender: "api"
          });
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
