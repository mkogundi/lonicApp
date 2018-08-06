import { Component,ViewChild } from '@angular/core';
import { Platform,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/Intro/intro';
import { CongratulatePage } from '../pages/congratulate/congratulate';
import { SurveyPage } from '../pages/survey/survey';
import { Portfolio } from '../pages/portfolio/portfolio';
import { OrderEntryPage } from '../pages/order-entry/order-entry';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;

  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
       window["ApiAIPlugin"].init(
        {
            clientAccessToken: "a2471a4e00b94d4dbece404b55f842f8", // insert your client access key here
            lang: "en" // set lang tag from list of supported languages
        }, 
        function(result) {  },
        function(error) {  }
      ); 
    });
    
  // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: CongratulatePage },
      { title: 'Invest', component: SurveyPage },
      { title: 'Portfolio', component: Portfolio },
      { title: 'Order', component: OrderEntryPage },
      { title: 'P2P', component: '' },
      { title: 'ActualHome', component: HomePage}
    ];
  }

  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

