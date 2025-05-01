import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const slideFromRight = animation([
  style({ opacity: 0, transform: 'translateX(100%)' }),
  animate('1s', style({ opacity: 1, transform: 'translateX(0%)' })),
]);
const slideIntoRight = animation(
  animate('1s', style({ opacity: 0, transform: 'translateX(100%)' }))
);

const slideFromLeft = animation([
  style({ opacity: 0, transform: 'translateX(-100%)' }),
  animate('1s', style({ opacity: 1, transform: 'translateX(0%)' })),
]);
const slideIntoLeft = animation(
  animate('1s', style({ opacity: 0, transform: 'translateX(-100%)' }))
);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: false,
  animations: [
    trigger('rightBlocks', [
      transition('void => *', useAnimation(slideFromRight)),
      transition('* => void', useAnimation(slideIntoRight)),
    ]),
    trigger('leftBlocks', [
      transition('void => *', useAnimation(slideFromLeft)),
      transition('* => void', useAnimation(slideIntoLeft)),
    ]),
  ],
})
export class MainComponent implements OnInit {
  envName: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.shouldAllow()) {
      this.router.navigate(['/home']);
    }
  }
}
