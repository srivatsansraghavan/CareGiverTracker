import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  standalone: false,
})
export class TimerComponent implements OnInit {
  constructor(public timer: TimerService) {}

  ngOnInit(): void {}
}
