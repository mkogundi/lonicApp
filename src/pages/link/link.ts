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
  mode ='';
  screen = 'mode';

  public onProceedClick() {
    
   this.mode =  'PIN';
   //this.iab.create('../assets/banks/bank.html',target,this.options);
   //browser.show();
   console.log('cane');
   /*var purl = 'https://api.plivo.com/v1/Account/MAODDMYWY3NDK0YJI2ND/Message/'

   var formdata = new FormData();
   formdata.append('src', '1951379337');
   formdata.append('dst', '+919789221273');
   formdata.append('text', '5582');
   this.postIt(purl, formdata);*/
    //this.theInAppBrowser.create(url,target,this.options);
}
public netbanking(){
  this.mode = 'netbanking';
}
public cdcard()
{
  this.mode = 'cdcard';
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
    this.screen = 'thanks';
    setTimeout(()=>{
      this.navCtrl.push(CongratulatePage,{
        data:'thanks'
      });
    },4000)
   
  }
  public closenetbanking(){
    this.mode = 'netbanking';
   
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
 
 visa;
 maestro;
 mastercard;
 amex;

 public cardtype(number)
 {
   console.log();
   var trigger = number._value,
    regexp = new RegExp("^3[47]");
   var amexc = regexp.test(trigger);
  
   regexp = new RegExp("^4");
   var visac = regexp.test(trigger);
   this.visa = true;
  
  regexp = new RegExp("^5[1-5]");
   var mastercardc = regexp.test(trigger);

  regexp = new RegExp("^6[0-9]");
   var maestroc = regexp.test(trigger);

   if(amexc ==true){
    this.amex = true;
  }
  else{
   this.amex = false;
  }
  if(visac ==true){
    this.visa = true;
  }
  else{
   this.visa = false;
  }
  if(mastercardc ==true){
    this.mastercard = true;
  }
  else{
   this.mastercard = false;
  }
  if(maestroc ==true){
    this.maestro = true;
  }
  else{
   this.maestro = false;
  }
 }
/*
 username = "MAODDMYWY3NDK0YJI2ND";
 password = "MTBhNzU5N2Y5YTc1ODhhNzk0NDBlYWJjOTE0MzAx";

 postIt(purl, postdata) {
  var headers = new HttpHeaders();
  headers.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
  
  
  //var options = new RequestOptions({ headers: headers });


  return this.http.post(purl, postdata, {headers: headers}).toPromise().then(response => {
  //var temp = JSON.parse(response["_body"]);
  console.log(response);
  });
  
  }
*/
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
