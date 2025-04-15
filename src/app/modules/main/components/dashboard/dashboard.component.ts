import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public globalService: GlobalService){}
  // Statistic Cards Data
  stats = [
    { label: 'Total Students', value: 1200, icon: 'pi pi-users' },
    { label: 'Total Teachers', value: 45, icon: 'pi pi-user' },
    { label: 'Attendance Today', value: '95%', icon: 'pi pi-check-circle' }
  ];

  // Bar Chart Data
  performanceData = {
    labels: ['Math', 'Science', 'English', 'History'],
    datasets: [{
      label: 'Average Scores',
      data: [85, 78, 92, 65],
      backgroundColor: '#3B82F6', // Blue
      borderColor: '#2563EB',
      borderWidth: 1
    }]
  };

  // Chart Options
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Scores' }
      }
    }
  };

  // School Rating
  schoolRating = 88;

  ngOnInit(): void {
    // You can replace this with API calls later
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simulate API data assignment
    this.stats = [
      { label: 'Total Students', value: 1200, icon: 'pi pi-users' },
      { label: 'Total Teachers', value: 45, icon: 'pi pi-user' },
      { label: 'Attendance Today', value: '95%', icon: 'pi pi-check-circle' }
    ];
    this.performanceData = {
      labels: ['Math', 'Science', 'English', 'History'],
      datasets: [{
        label: 'Average Scores',
        data: [85, 78, 92, 65],
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1
      }]
    };
    this.schoolRating = 88;
  }
}