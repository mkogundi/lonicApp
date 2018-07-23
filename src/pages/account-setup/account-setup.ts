import { Component,NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CongratulatePage } from '../congratulate/congratulate';
import {Http, Response} from '@angular/http';
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
  
  
  constructor(public navCtrl: NavController,private elRef:ElementRef, public navParams: NavParams,private camera: Camera,public ngZone: NgZone,public tts:TextToSpeech,private http:Http) {
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

  public licenseUrl = 'https://wabr.inliteresearch.com/barcodes';

  takePicture(){
    this.content.scrollToBottom(200);
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      allowEdit: false,
      correctOrientation: false,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options)
    .then((imageData)=>{
      this.base64Image = "data:image/jpeg;base64,"+imageData;
      setTimeout(()=>{
        this.uploadPicture = false;
        this.messages.push({
          text: "I am retrieving your personal information",
          sender: "api"
        });
        this.tts.speak({
          text:"I am retrieving your personal information",
          locale: "en-US",
          rate: 1
        });
      },2000)
      //this.callApiForDriverDetails();
     // alert(imageData);
     
      this.http.get('base64Data.txt').subscribe(data => {
        var formData = new FormData()
        formData.append('image',data.text());

        this.postIt(this.licenseUrl,formData);
      })
      
     /*  var formData = new FormData();
      formData.append('image',imageData);
      this.postIt(this.licenseUrl,formData); */
    })
    .catch(err=>{
      console.log(err);
    })
  }
  
    public license:any;

  

  public firstName;
  public lastName;

  public base64: any;
  
    onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.base64 = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }
  
  licensify() {
    //console.log(this.license);
    var formData = new FormData();
    formData.append('image', this.base64);
   // alert(this.base64);
    console.log(formData);
    this.postIt(this.licenseUrl, formData);
  }

  postIt(purl, postdata) {
   // alert(purl);
   //alert(postdata.get("image"));
   console.log(postdata);
    return this.http.post(purl, postdata).toPromise().then(response => {
      var temp = JSON.parse(response["_body"]);
      this.firstName = temp["Barcodes"][0]["Values"]["AAMVA"]["first"];
      this.lastName = temp["Barcodes"][0]["Values"]["AAMVA"]["last"]; 
      this.messages.push({
        text: "I see that your first name is " +this.firstName +" Would you like me to call you as "+this.firstName +"?",
        sender: "api"
      });
      this.tts.speak({
        text:"I see that your first name is " +this.firstName +" Would you like me to call you as "+this.firstName +"?",
        locale: "en-US",
        rate: 1
      });
      this.uploadPicture = false;
    });
  }

  callApiForDriverDetails(){
    setTimeout(()=>{
      
    },2000);
  }

  sendText(){
    let input = this.text;
    this.text = "";
    if(input == "123456789"){
      this.messages.push({
        text: "*****6789",
        sender: "me"
      });
      this.content.scrollToBottom(200);
    }
    else {
      this.messages.push({
        text: input,
        sender: "me"
      });
    }
    
    window["ApiAIPlugin"].requestText({
      query : input
    },
    (response)=>{
      this.ngZone.run(()=>{    
        if(response.result.fulfillment.speech.indexOf('Personal Information') >= 0){ 
        
          this.content.scrollToBottom(200);
          this.uploadPicture = true;
        } 
        else if(response.result.fulfillment.speech.indexOf('smile') >= 0){ 
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
        
        //this.content.scrollToBottom(200);
       // this.uploadPicture = true;
      }  
     else if(response.result.fulfillment.speech.indexOf('smile') >= 0){
        this.tts.speak({
          text:"Okay,now how about a selfie with a smile",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('iframe') >= 0){
        this.tts.speak({
          text:"I have validated the information provided Could you please review the summary below",
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
        
      //this.content.scrollToBottom(200);
     // this.uploadPicture = true;
    }  
   else if(response.result.fulfillment.speech.indexOf('smile') >= 0){
        this.tts.speak({
          text:"Okay,now how about a selfie with a smile",
          locale: "en-US",
          rate: 1
        });
      }
      else if(response.result.fulfillment.speech.indexOf('iframe') >= 0){
        this.tts.speak({
          text:"I have validated the information provided Could you please review the summary below",
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
         
          this.uploadPicture = true;
        }
        else if(response.result.fulfillment.speech.indexOf('smile') >= 0){ 
          this.messages.push({
            text: "Okay,now how about a selfie with a smile",
            sender: "api"
          });
          this.uploadPicture = false;
          this.uploadSelfie = true;
        }
        else if(response.result.fulfillment.speech.indexOf('Congratulations') >= 0){
          this.navigateAway();
         }
        else{
          this.uploadPicture = false;
          this.uploadSelfie = false;
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
