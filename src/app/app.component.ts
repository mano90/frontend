import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Data } from './Interfaces/data';
import { AppService } from './services/app.service';
Chart.register(...registerables);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  COLORS: string[] = [
    '#0081C9',
    '#FFC93C',
    '#820000',
    '#2B3A55',
    '#FF7B54',
    '#7F669D',
    '#3A8891',
    '#9E7676',
    '#3C2317',
    '#395144',
    '#182747',
  ];
  inputTypeChart: string = 'pie';
  lastQuantity: number = 0;
  inputQuantity: number = 0;
  lastDataType: string = 'license';
  dataType: string = 'license';

  observer1: any;
  observer2: any;
  data: Data[] = [];
  typeChart: any = 'pie';
  chart: any;
  constructor(private service: AppService) {}
  ngOnInit(): void {
    this.chart = new Chart('MyChart', {
      type: this.typeChart,
      data: {
        labels: [],
        datasets: [
          {
            label: 'License',
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });
    this.listeLicense();
  }

  listeLicense(quantite?: number) {
    this.observer1 = this.service.listeLicense(quantite).subscribe(
      (res) => {
        this.updateData(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  listeLanguage(quantite?: number) {
    this.observer2 = this.service.listeLanguage(quantite).subscribe(
      (res) => {
        this.updateData(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private updateData(data: Data[]) {
    this.chart.data.labels.length = 0;
    this.chart.data.datasets.forEach((dataset: any) => {
      dataset.data.length = 0;
    });
    this.chart.data.labels.push(...data.map((e) => e.label));

    this.chart.data.datasets.forEach((dataset: any) => {
      dataset.backgroundColor = this.COLORS;
      dataset.data.push(...data.map((e) => e.quantity));
    });
    this.chart.update();
  }

  getData() {
    if (
      this.typeChart != this.inputTypeChart ||
      this.inputQuantity != this.lastQuantity ||
      this.dataType != this.lastDataType
    ) {
      if (this.typeChart != this.inputTypeChart) {
        this.inputTypeChart === 'pie'
          ? (this.chart.config.type = 'pie')
          : (this.chart.config.type = 'bar');
        if (this.inputTypeChart === 'pie') {
          this.chart.options = {
            aspectRatio: 2.5,
          };
        }
        this.typeChart = this.inputTypeChart;
        this.chart.update();
      }

      if (this.dataType != this.lastDataType) {
        this.lastDataType = this.dataType;

        this.chart.data.datasets.forEach((dataset: any) => {
          dataset.label = this.dataType;
        });

        if (this.dataType === 'license') {
          this.listeLicense();
        } else {
          this.listeLanguage();
        }
      }

      if (this.inputQuantity != this.lastQuantity) {
        this.lastQuantity = this.inputQuantity;
        if (this.lastDataType === 'language') {
          this.listeLanguage(this.inputQuantity);
        } else {
          this.listeLicense(this.inputQuantity);
        }
      }
      this.lastQuantity = this.inputQuantity;
    }
  }

  ngOnDestroy(): void {
    this.observer1.unsubscribe();
    this.observer2.unsubscribe();
  }
}
