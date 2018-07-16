import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSetupPage } from './account-setup';

@NgModule({
  declarations: [
    AccountSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSetupPage),
  ],
})
export class AccountSetupPageModule {}
