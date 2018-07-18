import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CongratulatePage } from '../congratulate/congratulate';
@Component({
  selector: 'page-list',
  templateUrl: 'link.html'
})
export class LinkPage {
  selectedItem: any;
  BOALoginvisible = true; 
  BOAlinkvisible = false;
  BOApinvisible = false;
  CITILoginvisible = true;
  CITIlinkvisible = false;
  CITIpinvisible = false;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  mode;
  screen = 'mode';

  public onProceedClick() {
    
   this.mode =  'PIN';
   //this.iab.create('../assets/banks/bank.html',target,this.options);
   //browser.show();
   console.log('cane');
   
    //this.theInAppBrowser.create(url,target,this.options);
}

public onBOAClick()
{
  this.screen = 'BOA';
  console.log(this.screen);
}
public onCitiClick()
{
  this.screen = 'CITI';
  console.log(this.screen);
}
public onCancelClick(){
  this.mode =  '';
}
public addBotBOASignin(){
this.BOALoginvisible = false;
this.BOAlinkvisible = true;
this.BOApinvisible = false;
}

public addBotBOAproceed()
{
  this.BOALoginvisible = false;
this.BOAlinkvisible = false;
this.BOApinvisible = true;
}
public addBotCITISignin(){
  this.CITILoginvisible = false;
  this.CITIlinkvisible = true;
  this.CITIpinvisible = false;
  }
  public addBotCITIproceed()
  {
    this.CITILoginvisible = false;
  this.CITIlinkvisible = false;
  this.CITIpinvisible = true;
  }
  public thanksmsg()
  {
    this.screen = 'thanks'

    setTimeout(()=>{
      this.navCtrl.push(CongratulatePage,{
        data: this.screen
      });
    },4000)
   
  }
  public closenetbanking(){
    this.mode = 'netbanking';
    console.log('fdfd');
  }
 public closeing()
 {  
 this.screen = 'mode';
 this.BOALoginvisible = true; 
 this.BOAlinkvisible = false;
 this.BOApinvisible = false;
 this.CITILoginvisible = true;
 this.CITIlinkvisible = false;
 this.CITIpinvisible = false;
 
 }
 public cardtype()
 {
   console.log('fdfd');
 }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
      //this.toppings = 'cdcard';
    
    // Let's populate this page with some filler content for funzies
    this.icons = ['card', 'home'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(LinkPage, {
      item: item
    });
  }
}
