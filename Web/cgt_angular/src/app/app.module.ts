import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthConfigInterceptor } from './shared/authconfig.interceptor';
import { ToastComponent } from './shared/toast/toast.component';
import { FirstLoginComponent } from './home/first-login/first-login.component';
import { FeedingTrackerComponent } from './home/feeding-tracker/feeding-tracker.component';
import { ExcretionTrackerComponent } from './home/excretion-tracker/excretion-tracker.component';
import { MedicationTrackerComponent } from './home/medication-tracker/medication-tracker.component';
import { TimerComponent } from './shared/timer/timer.component';
import { TrackItemsPipe } from './shared/pipes/track-items.pipe';
import { InventoryTrackerComponent } from './home/inventory-tracker/inventory-tracker.component';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { ShowEditDeleteDirective } from './shared/directives/mousehover.directive';
import { DateDiffPipe } from './shared/pipes/show-date-diff.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenubarComponent,
    HomeComponent,
    ToastComponent,
    FirstLoginComponent,
    FeedingTrackerComponent,
    ExcretionTrackerComponent,
    MedicationTrackerComponent,
    TimerComponent,
    TrackItemsPipe,
    DateDiffPipe,
    ShowEditDeleteDirective,
    InventoryTrackerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbNavModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
