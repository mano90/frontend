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
    this.service.listeLicense(quantite).subscribe(
      (res) => {
        this.updateData(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  listeLanguage(quantite?: number) {
    this.service.listeLanguage(quantite).subscribe(
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

  ngOnDestroy(): void {}
}
