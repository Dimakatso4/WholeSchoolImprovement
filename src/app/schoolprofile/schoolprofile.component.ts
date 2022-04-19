import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexGrid,
  ApexChart, ApexXAxis, ApexYAxis, ApexMarkers, ApexStroke, ApexLegend,
  ApexTooltip, ApexDataLabels, ApexFill, ApexPlotOptions, ApexResponsive,
  ApexNonAxisChartSeries, ApexTitleSubtitle, } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  // name: string[];
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers,
  stroke: ApexStroke,
  legend: ApexLegend,
  responsive: ApexResponsive[],
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
  title: ApexTitleSubtitle
};

@Component({
  selector: 'app-schoolprofile',
  templateUrl: './schoolprofile.component.html',
  styleUrls: ['./schoolprofile.component.scss']
})
export class SchoolprofileComponent implements OnInit {

  selectedYear: number | undefined;
  years: number[] = [];

  @ViewChild("chart") chart: ChartComponent;

 
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;
  public areaChartOptions: Partial<ChartOptions>;
  public mixedChartOptions: Partial<ChartOptions>;
  public donutChartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;
  public heatMapChartOptions: Partial<ChartOptions>;
  public radarChartOptions: Partial<ChartOptions>;
  public scatterChartOptions: Partial<ChartOptions>;
  public radialBarChartOptions: Partial<ChartOptions>;

  constructor() { 

    this.pieChartOptions = {
      nonAxisSeries: [30, 69, 13, 33],
      //colors: ["#f77eb9", "#7ee5e5","#4d8af0","#fbbc06"],
     // name:["Term1", "Term2","Term3", "Term4"],
      colors: ["#FD1C03", "#2dc937","#FF0000","#FFBF00"],
      //colors: ["#808080", "#3DDC84 ","#FF0000","#fbbc06"],
      chart: {
        height: 300,
        type: "pie"
      },
      stroke: {
        colors: ['rgba(0,0,0,0)']
      },
      legend: {
        position: 'right',
        horizontalAlign: 'center'
      },
      dataLabels: {
        enabled: false
      }
    };



    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2017; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
  }
   
  /**
   * Generating demo data for area chart
   */    
   generateDayWiseTimeSeries(s, count) {
    var values = [[
      4,3,10,9,29,19,25,9,12,7,19,5,13,9,17,2,7,5
    ], [
      2,3,8,7,22,16,23,7,11,5,12,5,10,4,15,2,6,2
    ]];
    var i = 0;
    var series = [];
    var x = new Date("11 Nov 2020").getTime();
    while (i < count) {
      series.push([x, values[s][i]]);
      x += 86400000;
      i++;
    }
    return series;
  }

  /**
   * Generating demo data for area chart
   */
  generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
  }

}



