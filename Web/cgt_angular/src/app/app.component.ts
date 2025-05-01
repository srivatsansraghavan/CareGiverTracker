import { Component, HostListener, OnInit } from '@angular/core';
import { ToastService } from './shared/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // clearLocalStorage() {
  //   console.log('Clear local storage');
  //   localStorage.clear();
  // }
  constructor(public toastService: ToastService) {}

  ngOnInit() {}
}
