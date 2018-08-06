import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as Highcharts from 'highcharts';
import * as Highstock from 'highcharts/highstock';

import { Http } from '../../../node_modules/@angular/http';



@Component({
    selector: 'page-list',
    templateUrl: 'portfolio.html'
  })
  export class Portfolio {
chartdata ;
constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http) {

}

ngOnInit(): void{
    var seriesOptions = [],
    seriesCounter = 0,
    names = ['invested', 'total' ];
    

    for (var name of names){
        console.log(name);
        this.http.get('assets/data/' + name + '.json'  ).subscribe (data=>{
            console.log(data.json());
            seriesOptions[seriesCounter] = {
                name: name,
                data: data.json()
            };
            /*if(seriesCounter = 0 ){
                seriesOptions[0] = {
                    name: 'Invested Amount',
                    data: data
                };
            }
            else{
                seriesOptions[1] = {
                    name: 'Total Amount',
                    data: data
                };
            }*/
            
            console.log(seriesOptions);
    
            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;
            //console.log(names.length);
            
            if (seriesCounter === names.length) {
                seriesOptions[0].name = 'Invested Amount';
                seriesOptions[1].name = 'Total Amount';
                console.log(seriesOptions);

                Highstock.stockChart('timeserieschart', {

        rangeSelector: {
            enabled : false
        },
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
           
          },
          credits: {
            enabled: false
        },
    
        yAxis: {
            
            labels: {
                enabled: false
            },
            gridLineColor: 'transparent',
            gridLineWidth: 0,
            title: null,
            "startOnTick": true,
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
      
        xAxis : { 
            lineWidth: 0,
           
            minorGridLineWidth: 0,
            minorTickLength: 0,
            tickLength: 0
        },
        scrollbar: {
            enabled: false
    },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },
        navigator: {
            enabled: false
        },
        
        tooltip: {
            pointFormat: '<span style="color:white">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#000000',
            style: {
                color: 'white'
            },
            borderWidth: 0,
        },

        series:seriesOptions

    });
            }
    })
}



/*    
  this.http.get('../assets/chart.json').subscribe (data=>{
     this.chartdata= data;

    console.log(this.chartdata)  ;
    let options ={
      rangeSelector :{
        
        enabled: false
  
      },

    plotOptions: {
       
    },
      chart: {
        backgroundColor :'#64c74e',
        plotBorderColor: '#606063'
      },
      title: {
        text: '',
        style:{
          fontSize:'12px'
        },
        chart: {
        },
      },  navigator: {
        enabled: false
    },
    xAxis : { 
        lineWidth: 0,
        tickWidth: 0,
        labels: {
            enabled: false
        }
    }, yAxis : { 
        labels: {
            enabled: false
        },
        gridLineWidth: 0,
        title: null,
        "startOnTick": true
    },
    scrollbar: {
        enabled: false
},
      series:[{
        data :this.chartdata,
        type: 'areaspline',
        tooltip:{
          valueDecimals :2
        },fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, 'white'],
                [1, Highcharts.Color('white').setOpacity(0).get('rgba')]
            ]
        },
      
      }]
    }
    
    Highstock.stockChart('timeserieschart', options)
   
  })
  */
// Create the chart
/*Highcharts.chart('piechart', {
  chart: {
      type: 'pie',
      height: 150
  },
  title: {
      text: 'Portfolio Summary',
      style: {
        fontSize: '14px',
        fontWeight: 'bold'
      }
  },
  
  plotOptions: {
      series: {
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'
          }
      }
      
  },

  tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  "series": [
      { size: '100%',
      innerSize: '80%',
          "name": "Browsers",
          "colorByPoint": true,
          "data": [
              {
                  "name": "stocks",
                  "y": 60.00,
                  "drilldown": "stocks"
              },
              {
                  "name": "Fixed Income",
                  "y": 20.00,
                  "drilldown": "Fixed Income"
              },
              {
                  "name": "Commodities",
                  "y": 10.00,
                  "drilldown": "Commodities"
              },
              {
                  "name": "Cash",
                  "y": 5.00,
                  "drilldown": "Cash"
              },
              {
                  "name": "Other",
                  "y": 5.00,
                  "drilldown": "Other"
              }
          ]
      }
  ],
  "drilldown": {
      "series": [
          {
              "name": "Stocks",
              "id": "stocks",
              "data": [
                  [
                      "v65.0",
                      0.1
                  ],
                  [
                      "v64.0",
                      1.3
                  ],
                  [
                      "v63.0",
                      53.02
                  ],
                  [
                      "v62.0",
                      1.4
                  ],
                  [
                      "v61.0",
                      0.88
                  ],
                  [
                      "v60.0",
                      0.56
                  ],
                  [
                      "v59.0",
                      0.45
                  ],
                  [
                      "v58.0",
                      0.49
                  ],
                  [
                      "v57.0",
                      0.32
                  ],
                  [
                      "v56.0",
                      0.29
                  ],
                  [
                      "v55.0",
                      0.79
                  ],
                  [
                      "v54.0",
                      0.18
                  ],
                  [
                      "v51.0",
                      0.13
                  ],
                  [
                      "v49.0",
                      2.16
                  ],
                  [
                      "v48.0",
                      0.13
                  ],
                  [
                      "v47.0",
                      0.11
                  ],
                  [
                      "v43.0",
                      0.17
                  ],
                  [
                      "v29.0",
                      0.26
                  ]
              ]
          },
          {
              "name": "Firefox",
              "id": "Firefox",
              "data": [
                  [
                      "v58.0",
                      1.02
                  ],
                  [
                      "v57.0",
                      7.36
                  ],
                  [
                      "v56.0",
                      0.35
                  ],
                  [
                      "v55.0",
                      0.11
                  ],
                  [
                      "v54.0",
                      0.1
                  ],
                  [
                      "v52.0",
                      0.95
                  ],
                  [
                      "v51.0",
                      0.15
                  ],
                  [
                      "v50.0",
                      0.1
                  ],
                  [
                      "v48.0",
                      0.31
                  ],
                  [
                      "v47.0",
                      0.12
                  ]
              ]
          },
          {
              "name": "Internet Explorer",
              "id": "Internet Explorer",
              "data": [
                  [
                      "v11.0",
                      6.2
                  ],
                  [
                      "v10.0",
                      0.29
                  ],
                  [
                      "v9.0",
                      0.27
                  ],
                  [
                      "v8.0",
                      0.47
                  ]
              ]
          },
      
          {
              "name": "Edge",
              "id": "Edge",
              "data": [
                  [
                      "v16",
                      2.6
                  ],
                  [
                      "v15",
                      0.92
                  ],
                  [
                      "v14",
                      0.4
                  ],
                  [
                      "v13",
                      0.1
                  ]
              ]
          },
         
      ]
  }
});
*/
}
  }