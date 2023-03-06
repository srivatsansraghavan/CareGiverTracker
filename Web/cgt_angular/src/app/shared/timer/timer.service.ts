import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  elapsedHour: string = '00';
  elapsedMinute: string = '00';
  elapsedSecond: string = '00';
  totalSeconds: number = 0;
  currentTime: Date;
  constructor() {}

  start(startedTime: Date) {
    this.elapsedHour = '00';
    this.elapsedMinute = '00';
    this.elapsedSecond = '00';
    let interval = setInterval(() => {
      this.currentTime = new Date();
      let diffTimeSecond = Math.floor(
        (this.currentTime.getTime() - startedTime.getTime()) / 1000
      );
      this.totalSeconds = diffTimeSecond;
      let diffTimeMinute = Math.floor(
        (this.currentTime.getTime() - startedTime.getTime()) / 60000
      );
      let diffTimeHour = Math.floor(
        (this.currentTime.getTime() - startedTime.getTime()) / 3600000
      );
      this.elapsedSecond = (
        diffTimeSecond > 59 ? diffTimeSecond % 60 : diffTimeSecond
      ).toLocaleString('en-US', { minimumIntegerDigits: 2 });
      this.elapsedMinute = (
        diffTimeMinute > 59 ? diffTimeMinute % 60 : diffTimeMinute
      ).toLocaleString('en-US', { minimumIntegerDigits: 2 });
      this.elapsedHour = (
        diffTimeHour > 23 ? diffTimeHour % 24 : diffTimeHour
      ).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    }, 1000);
    return interval;
  }

  stop(trackerInterval) {
    clearInterval(trackerInterval);
    return this.totalSeconds;
  }
}
