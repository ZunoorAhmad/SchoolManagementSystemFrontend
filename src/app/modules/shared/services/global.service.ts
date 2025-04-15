import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as lodash from "lodash";
import { Subject } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

interface ModalParams {
  width?: string;
  header?: string;
  class?: string;
}

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  showSpinner: boolean = false;
  claim = {
    admin: false,
    company: false,
  };
  userToken: string = "";
  subCategoriesArray = [];
  status = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Test", value: "test" },
  ];
  currentUser: any;
  constructor(
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef
  ) { }

  goToPage(page, arg = {}) {
    this.router.navigate([page, arg]);
  }

  goBack() {
    this.location.back();
  }

  getStorage(key) {
    let storage = localStorage.getItem(key);
    if (storage) {
      storage = JSON.parse(storage);
    }
    return storage;
  }

  clearStorage() {
    localStorage.clear();
  }

  mapSavingFields(toSave, data) {
    if (!data.createdAt) {
      data.createdAt = this.getCurrentDateAndTime();
    }
    if (!data.updatedAt) {
      data.updatedAt = this.getCurrentDateAndTime();
    }
    return lodash.assign(toSave, lodash.pick(data, lodash.keys(toSave)));
  }

  public getCurrentDateAndTime(): string {
    const date = new Date();
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const year = date.getFullYear() > 9 ? date.getFullYear() : "0" + date.getFullYear();
    return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
  }

  isHttpUrl(value: string): boolean {
    const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(value);
  }

  isBase64Image(value: string): boolean {
    if (typeof value !== "string") {
      return false;
    }

    const base64Pattern = /^data:image\/(jpeg|png|gif|jpg);base64,/;
    const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;

    return base64Pattern.test(value) || urlPattern.test(value);
  }

  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setObservable(variable: string, value): void {
    this[variable].next(value);
  }

  getObservable(variable: string): Subject<string | boolean | number | object | Array<string | number | object>> {
    return this[variable];
  }

  showToast(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  formatDate(date) {
    const d = new Date(date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();

    if (day.length < 2)
      day = '0' + day;
    if (month.length < 2)
      month = '0' + month;

    return [day, month, year].join('-');
  }

  closeModal() {
    this.dialogRef.close();
  }

  showDynamicDialog(component, modalParams = { width: "", header: "", class: "" } as ModalParams, params) {
    const ref = this.dialogService.open(component, {
      data: params,
      header: modalParams.header,
      width: modalParams.width,
      styleClass: "params-edit-p-dialog",
    });
    return new Promise((resolve, reject) => {
      ref.onClose.subscribe(data => {
        if (data) {
          resolve(data);
        }
      });
    });
  }

  alertBox(header: string, message: string) {
    return new Promise(resolve => {
      this.confirmationService.confirm({
        message: message,
        header: header,
        icon: "pi pi-info-circle",
        acceptLabel: "Ok",
        acceptButtonStyleClass: "",
        rejectVisible: false,
        accept: () => {
          if (message == "A verification mail has been sent to you mail") {
            this.goToPage("/auth/login");
          }
          resolve(true);
        },
      });
    });
  }

  confirm(message: string, header: string, acceptLabel: string = 'Yes', rejectLabel: string = 'No') {
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        message: message,
        header: header,
        acceptLabel: acceptLabel,
        rejectLabel: rejectLabel,
        icon: "pi pi-info-circle",
        rejectIcon: 'no-icon',
        acceptIcon: 'no-icon',
        rejectButtonStyleClass: "p-button-danger",
        acceptButtonStyleClass: "p-button-success",
        reject: () => {
          reject(false);
        },
        accept: () => {
          resolve(true);
        },
      });
    });
  }

  randomString(length: number = 20): string {
    let result = "";
    const characters = "ABCDEFG5425324HIJKWXYZa125123bcdefgLMNOPQRSTUVhijklmn23opqrstuvwxyz01456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getTimeFormat(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const year = date.getFullYear() > 9 ? date.getFullYear() : "0" + date.getFullYear();
    return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
  }

  startSpinner() {
    this.showSpinner = true;
  }

  stopSpinner() {
    this.showSpinner = false;
  }

  checkSpinner() {
    if (this.showSpinner) {
      this.showSpinner = false;
    }
  }
}
