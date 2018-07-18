import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SpeechRecognition } from '@ionic-native/speech-recognition';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/Intro/intro';
import { AccountSetupPage } from '../pages/account-setup/account-setup';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { CongratulatePage } from '../pages/congratulate/congratulate';
import { LinkPage } from '../pages/link/link';
import { SurveyPage } from '../pages/survey/survey';
import { OrderEntryPage } from '../pages/order-entry/order-entry';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    HomePage,
    ListPage,
    AccountSetupPage,
    SafeHtmlPipe,
    CongratulatePage,
    LinkPage,
    SurveyPage,
    OrderEntryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    HomePage,
    ListPage,
    AccountSetupPage,
    CongratulatePage,
    LinkPage,
    SurveyPage,
    OrderEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,TextToSpeech,Camera,FingerprintAIO,SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
