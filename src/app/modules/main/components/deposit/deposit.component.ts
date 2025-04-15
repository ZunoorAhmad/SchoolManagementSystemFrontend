import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../../../environments/environment';
import { UploadEvent } from 'primeng/fileupload';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent implements OnInit {

  selectedFile: File = null;
  depositAmount: number = null;
  user: any = {};
  userDeposits: any[] = [];

  constructor(
    private http: HttpService,
    private global: GlobalService
  ) {
    this.user = this.global.getStorage("userInfo");
  }

  ngOnInit(): void {
    this.http.get(environment.backend.baseURL + 'deposits/' + this.user.user_id + "/").then((res:any) => {
      this.userDeposits = res;
    })
  }

  onSelect(event: any) {
    const file = event.currentFiles[0]; // Access the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result; // The Base64 string of the image
        this.selectedFile = base64Image;
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  }

  onSubmit() {
    if (!this.depositAmount || this.depositAmount == null) {
      this.global.alertBox('Alert!', "Enter Deposit Amount");
      return
    }
    if (!this.selectedFile || this.selectedFile == null) {
      this.global.alertBox('Alert!', "Upload Screenshot");
      return
    }
    const body = { amount_requested: this.depositAmount, screenshot: this.selectedFile };
    this.http.post(environment.backend.baseURL + 'deposits/' + this.user.user_id + "/", body).then(
      response => {
        this.global.showToast("success", "Successfully", "Deposit Request submitted successfully");
        this.global.goToPage('main/home');
      },
      error => {
        this.global.alertBox("Error", "An Unknown error occured");
        console.error('Error uploading data:', error);
      }
    );
  }
}