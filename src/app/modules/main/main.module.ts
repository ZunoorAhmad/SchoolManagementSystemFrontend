import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordComponent } from './components/record/record.component';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsListingComponent } from './components/students-listing/students-listing.component';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [NavbarComponent, HeaderComponent, StudentsListingComponent, DepositComponent, RecordComponent, DashboardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    FileUploadModule,
    CardModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressSpinnerModule
  ]
})
export class MainModule { }
