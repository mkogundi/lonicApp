import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides, Platform, Events} from 'ionic-angular';
import { AccountSetupPage } from '../account-setup/account-setup';
import { FingerprintAIO , FingerprintOptions} from '@ionic-native/fingerprint-aio'
import { ListPage } from '../list/list';
import { CongratulatePage } from '../congratulate/congratulate';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  animations: [

    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ]
})
export class IntroPage {

  fingerprintOptions: FingerprintOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,private fingerprint: FingerprintAIO,private googlePlus: GooglePlus,public events:Events) {
    this.fingerprintOptions = {
      clientId: 'IonicAI',
      clientSecret: 'password',
      disableBackup: true
    };
  }

  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';

  skip() {
    this.navCtrl.push(AccountSetupPage);
  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

  async showFingerPrintDailog(){
    try {
        await this.platform.ready();
        const available = await this.fingerprint.isAvailable();
        if(available === 'finger'){
          const result = await this.fingerprint.show(this.fingerprintOptions);
          if (result != ''){
            this.navCtrl.setRoot(CongratulatePage,{data:'alreadyLoggedIn'});
          }
        }
    } catch (error) {
      console.log(error)
    }
    
  }

  googleSignin(){
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '57591030073-h4gksiglu85v4jq9jce9qr66cpikgu2c.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then((res) =>{ 
       // alert(res);
       // console.log(res);
        this.events.publish('user:created',res);
        this.navCtrl.setRoot(HomePage,{data:res})
      } )
      .catch((err) =>{ 
      //  console.error(err);
       //  alert("blah"); 
        });
  }

}
