import { Component,ViewChild } from '@angular/core';
import { Platform,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*  window["ApiAIPlugin"].init(
        {
            clientAccessToken: "697a929cd7574ca49cff4da2a43c6025", // insert your client access key here
            lang: "en" // set lang tag from list of supported languages
        }, 
        function(result) {  },
        function(error) {  }
      );  */
    });
    
  // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: ListPage },
      { title: 'EVA', component: HomePage }
    ];
  }

  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

