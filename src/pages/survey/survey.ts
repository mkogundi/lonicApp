import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { OrderEntryPage } from '../order-entry/order-entry';
import { FingerprintAIO, FingerprintOptions } from '../../../node_modules/@ionic-native/fingerprint-aio';
import { CongratulatePage } from '../congratulate/congratulate';
/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  @ViewChild(Slides) slidesquestion: Slides;
  fingerprintOptions: FingerprintOptions;
  InvestorType: String = 'Based on the survey result we categorize your investment profile as';
  portfolioseries: any = [];
  portfoliochart: any;
  ContinueTrade:Boolean = true;
  ShowPortfolioRecommendation: Boolean = true;
  AccountType: String = "Yes";
  EmployeeType: String = "Employed";
  Result:any = [
    {
      FundName:'',
      FundPercent:''
    }
  ];
  AccountTypeQuestion: String = "Would you like us to manage your money for you ?";
  slides = [
    {
      id: 'Q1',
      title: "Question 1",
      description: "Please rate your level of financial knowledge ?",
      answer: 0,
      AnswerType: 'slider',
      LowRange: 0,
      HighRange: 5,
      step: 1,
      LowerRangeText: 'Novice (0)',
      HighRangeText: 'Expert (5)',
      DisplayLabel: '',
      DisplayType: 'End'
      //image: "assets/img/ica-slidebox-img-1.png",
    }, {
      id: 'Q2',
      title: "Question 2",
      description: "Are you employed ?",
      answer: "",
      AnswerType: 'checkbox'
      //image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      id: 'Q3',
      title: "Question 3",
      description: "What percentage of your monthly income would you be willing to spend on lotteries if you know that there is a 50% chance of winning ?",
      answer: 0,
      AnswerType: 'slider',
      LowRange: 0,
      HighRange: 100,
      step: 5,
      LowerRangeText: '0%',
      HighRangeText: '100%',
      DisplayLabel: '%',
      DisplayType: 'End'
      //image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      id: 'Q4',
      title: "Question 4",
      description: "At what age do you plan to retire?",
      answer: 0,
      AnswerType: 'slider',
      LowRange: 0,
      HighRange: 100,
      step: 1,
      LowerRangeText: '0',
      HighRangeText: '100',
      DisplayLabel: 'years',
      DisplayType: 'End'
      //image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      id: 'Q5',
      title: "Question 5",
      description: "What is the total value of your cash and liquid investments?",
      answer: 0,
      AnswerType: 'slider',
      LowRange: 0,
      HighRange: 1000000,
      step: 10000,
      LowerRangeText: '0',
      HighRangeText: '1M',
      DisplayLabel: '$',
      DisplayType: 'Start'
      //image: "assets/img/ica-slidebox-img-1.png",
    }
  ];
  SelectIcon: String = "thumbs-up";
  SurveyAnswer: number = 0;
  moveToSlide = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,private fingerprint: FingerprintAIO) {
    this.moveToSlide = this.navParams.get('data');
    
    this.fingerprintOptions = {
      clientId: 'IonicAI',
      clientSecret: 'password',
      disableBackup: true
    };
  }

  ionViewDidLoad() {
    if(this.moveToSlide == 'basic'){

      setTimeout(()=>{    
        this.slidesquestion.slideTo(0, 500);
      },100);

      
    }
    else if(this.moveToSlide == 'invest') {

      setTimeout(()=>{    
        this.slidesquestion.slideTo(6,2000);
      },100);

     
    }
    console.log('ionViewDidLoad SurveyPage');
  }

  ShowNextSlide() {
    this.slidesquestion.slideNext();
    console.log(this.slidesquestion.clickedIndex);
  }

  ShowPreviousSlide() {
    this.slidesquestion.slidePrev();
  }

  confirmInvest(navigateTo) {
    if(navigateTo == 'orderEntry')
      this.navCtrl.push(OrderEntryPage);
    else if(navigateTo == 'sendToHome')  
      this.showFingerPrintDailog();
  }

  async showFingerPrintDailog(){
    try {
        await this.platform.ready();
        const available = await this.fingerprint.isAvailable();
        if(available === 'finger'){
          const result = await this.fingerprint.show(this.fingerprintOptions);
          if (result != ''){
            this.navCtrl.push(CongratulatePage,{data:'startInvesting'});
          }
        }
    } catch (error) {
      console.log(error)
    }
    
  }

  ShowSurveyResult() {
    console.log(this.slides);
    console.log(this.AccountType);
    let InvestorProfile: String = "CONSERVATIVE";
    let InvestorScore: number = 0;
    let Q1InvestorScore: number = 0;
    let Q2InvestorScore: number = 0;
    let Q3InvestorScore: number = 0;
    let Q4InvestorScore: number = 0;
    let Q5InvestorScore: number = 0;
    this.ShowPortfolioRecommendation = (this.AccountType == "Yes") ? true : false;
    console.log(this.ShowPortfolioRecommendation);
    let Q1 = this.slides.filter(slide => slide.id == "Q1");
    let Q2 = this.slides.filter(slide => slide.id == "Q2");
    let Q3 = this.slides.filter(slide => slide.id == "Q3");
    let Q4 = this.slides.filter(slide => slide.id == "Q4");
    let Q5 = this.slides.filter(slide => slide.id == "Q5");
    console.log(Q1[0].answer);
    console.log(Q2[0].answer);
    console.log(Q3[0].answer);
    console.log(Q4[0].answer);
    console.log(Q5[0].answer);
    if (Q1[0].answer == 1) {
      Q1InvestorScore = 1;
    } else if (Q1[0].answer == 2) {
      Q1InvestorScore = 2;
    } else if (Q1[0].answer == 3) {
      Q1InvestorScore = 3;
    } else if (Q1[0].answer == 4) {
      Q1InvestorScore = 5;
    } else if (Q1[0].answer == 5) {
      Q1InvestorScore = 8;
    }

    if (Q2[0].answer == "Employed") {
      Q2InvestorScore = 8;
    } else if (Q2[0].answer == "Unemployed") {
      Q2InvestorScore = 4;
    } else if (Q2[0].answer == "Student") {
      Q2InvestorScore = 6;
    } else if (Q2[0].answer == "Retired") {
      Q2InvestorScore = 2;
    }

    if (Q3[0].answer >= 0 && Q3[0].answer <= 20) {
      Q3InvestorScore = 2;
    } else if (Q3[0].answer >= 21 && Q3[0].answer <= 40) {
      Q3InvestorScore = 3;
    } else if (Q3[0].answer >= 41 && Q3[0].answer <= 60) {
      Q3InvestorScore = 5;
    } else if (Q3[0].answer >= 61 && Q3[0].answer <= 80) {
      Q3InvestorScore = 7;
    } else if (Q3[0].answer >= 81 && Q3[0].answer <= 100) {
      Q3InvestorScore = 12;
    }

    if (Q4[0].answer >= 0 && Q4[0].answer <= 30) {
      Q4InvestorScore = 10;
    } else if (Q4[0].answer >= 31 && Q4[0].answer <= 40) {
      Q4InvestorScore = 8;
    } else if (Q4[0].answer >= 41 && Q4[0].answer <= 50) {
      Q4InvestorScore = 5;
    } else if (Q4[0].answer >= 51 && Q4[0].answer <= 60) {
      Q4InvestorScore = 3;
    } else if (Q4[0].answer >= 61) {
      Q4InvestorScore = 0;
    }

    if (Q5[0].answer >= 0 && Q5[0].answer <= 25000) {
      Q5InvestorScore = 2;
    } else if (Q5[0].answer >= 25001 && Q5[0].answer <= 50000) {
      Q5InvestorScore = 4;
    } else if (Q5[0].answer >= 50001 && Q5[0].answer <= 100000) {
      Q5InvestorScore = 6;
    } else if (Q5[0].answer >= 100001) {
      Q5InvestorScore = 8;
    }
    
    InvestorScore = 2 + Q1InvestorScore + Q2InvestorScore + Q3InvestorScore + Q4InvestorScore + Q5InvestorScore;
    if (InvestorScore >= 0 && InvestorScore <= 13) {
      InvestorProfile = "CONSERVATIVE";
      this.portfolioseries = [{
        name: 'Portfolio',
        data: [
          {
            name: 'Equity',
            y: 40,
            sliced: true,
            color:'#42d4f4'
          },
          {
            name: 'Fixed Income & Short Term',
            y: 60,
            sliced: false,
            color:'#41f4af'
          }
        ]
      }];
      this.Result = [
        {FundName:'Fidelity Global Bond Fund',FundPercent:'21.70%'},
        {FundName:'Fidelity Canadian Bond Fund',FundPercent:'12.0%'},
        {FundName:'Fidelity US All Cap Fund',FundPercent:'8.10%'},
        // {FundName:'GS Bond Fund',FundPercent:'4.8%'},
        // {FundName:'BlackRock US Growth Fund',FundPercent:'4.6%'}
      ];
    } else if (InvestorScore >= 14 && InvestorScore <= 19) {
      InvestorProfile = "MODERATELY CONSERVATIVE";
      this.portfolioseries = [{
        name: 'Portfolio',
        data: [
          {
            name: 'Equity',
            y: 60,
            sliced: true,
            color:'#42d4f4'
          },
          {
            name: 'Fixed Income & Short Term',
            y: 40,
            sliced: false,
            color:'#41f4af'
          }
        ]
      }];
      this.Result = [
        {FundName:'Fidelity Global Bond Fund',FundPercent:'13.20%'},
        {FundName:'Fidelity Canadian Bond Fund',FundPercent:'12.50%'},
        {FundName:'Fidelity Canadian Disciplined Equity Fund',FundPercent:'9.5%'},
        // {FundName:'Vanguard International Fund',FundPercent:'8.8%'},
        // {FundName:'BlackRock US Growth Fund',FundPercent:'7.4%'}
      ];
    }
    else if (InvestorScore >= 20 && InvestorScore <= 28) {
      InvestorProfile = "MODERATE";
      this.portfolioseries = [{
        name: 'Portfolio',
        data: [
          {
            name: 'Equity',
            y: 60,
            sliced: true,
            color:'#42d4f4'
          },
          {
            name: 'Fixed Income & Short Term',
            y: 40,
            sliced: false,
            color:'#41f4af'
          }
        ]
      }];
      this.Result = [
        {FundName:'Fidelity Global Bond Fund',FundPercent:'18.60%'},
        {FundName:'Fidelity Emerging Markets Fund',FundPercent:'8.80%'},
        {FundName:'Fidelity Int. Growth Inv Trust',FundPercent:'8.20%'},
        // {FundName:'GS Bond Fund',FundPercent:'4.8%'},.
        // {FundName:'BlackRock US Growth Fund',FundPercent:'4.6%'}
      ];
    }
    else if (InvestorScore >= 29 && InvestorScore <= 40) {
      InvestorProfile = "MODERATELY AGGRESSIVE";
      this.portfolioseries = [{
        name: 'Portfolio',
        data: [
          {
            name: 'Equity',
            y: 85,
            sliced: true,
            color:'#42d4f4'
          },
          {
            name: 'Fixed Income & Short Term',
            y: 15,
            sliced: false,
            color:'#41f4af'
          }
        ]
      }];
      this.Result = [
        {FundName:'Fidelity True North Fund',FundPercent:'18.80%'},
        {FundName:'Fidelity Canadian Disciplined Equity Fund',FundPercent:'13.6%'},
        {FundName:'Fidelity Int. Growth Inv Trust',FundPercent:'10.8%'},
        // {FundName:'GS Bond Fund',FundPercent:'4.8%'},
        // {FundName:'BlackRock US Growth Fund',FundPercent:'4.6%'}
      ];
    }
    else if (InvestorScore >= 41) {
      InvestorProfile = "AGGRESSIVE";
      this.portfolioseries = [{
        name: 'Portfolio',
        data: [
          {
            name: 'Equity',
            y: 85,
            sliced: true,
            color:'#42d4f4'
          },
          {
            name: 'Fixed Income & Short Term',
            y: 15,
            sliced: false,
            color:'#41f4af'
          }
        ]
      }];
      this.Result = [
        {FundName:'Fidelity Int. Growth Inv Trust',FundPercent:'17.10%'},
        {FundName:'Fidelity Emerging Markets Fund',FundPercent:'10.80%'},
        {FundName:'Fidelity Focused U.S. Stock Fund',FundPercent:'9.6%'},
        // {FundName:'Fidelity US Focused Stock Fund',FundPercent:'4.8%'},
        // {FundName:'BlackRock US Growth Fund',FundPercent:'4.6%'}
      ];
    }
    this.InvestorType = "Your investment profile is <b>" + InvestorProfile + "</b>";

    if (this.ShowPortfolioRecommendation) {

      this.portfoliochart = HighCharts.chart('PortfolioChart', {
        chart: {
          type: 'pie',
          height: 200
        },
        title: {
          text: 'Recommended Portfolio',
          style:{
            fontSize:'14px',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.point.name + '</b> : ' + this.y + '%';
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect:true,
            dataLabels: {
              enabled: true,
              formatter: function () {
                return Math.round(this.percentage * 100) / 100 + ' %';
              },
              color:'black',
              shadow:false,
              distance: -15,
              style:{
                textOutline:false
              }
            },
            showInLegend: true
          }
        },
        credits: {
          enabled: false
        },
        series: this.portfolioseries
      });
    }
  }

  placeOrder(){
   // this.navCtrl.push(OrderEntryPage);
    this.showFingerPrintDailog();
  }

  // SwitchAnswer() {
  //   console.log(this.SelectIcon);
  //   this.SelectIcon = (this.SelectIcon == "thumbs-up") ? "thumbs-down" : "thumbs-up";
  //   if (this.SelectIcon == "thumbs-up") {
  //     this.ShowPortfolioRecommendation = true;
  //   } else {
  //     this.ShowPortfolioRecommendation = false;
  //   }
  // }

}
