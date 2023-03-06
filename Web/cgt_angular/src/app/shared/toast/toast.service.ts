import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(header: string, text: string, toastClass: string, autohide: boolean) {
    this.toasts.push({
      headertext: header,
      displaytext: text,
      classname: toastClass,
      autohide: autohide,
    });
  }
}
