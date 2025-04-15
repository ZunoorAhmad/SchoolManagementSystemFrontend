import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHttpInterceptor } from './modules/shared/interceptors/auth.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, BrowserModule, HttpClientModule, ToastModule, ConfirmDialogModule, BrowserAnimationsModule],
    providers: [
        DialogService, DynamicDialogRef, MessageService, ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
