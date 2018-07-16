import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera} from '@ionic-native/camera';

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

  

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {
  }

  public base64Image: string;

  takePicture(){
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
    })
    .catch(err=>{
      console.log(err);
    })
  }


}
