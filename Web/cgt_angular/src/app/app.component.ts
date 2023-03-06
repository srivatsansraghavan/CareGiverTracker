import { Component, OnInit } from '@angular/core';
import { ToastService } from './shared/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit() {}
}
