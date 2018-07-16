import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/Intro/intro';
import { AccountSetupPage } from '../pages/account-setup/account-setup';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    ListPage,
    AccountSetupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    ListPage,
    AccountSetupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,TextToSpeech,Camera,FingerprintAIO,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
