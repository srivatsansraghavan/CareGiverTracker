import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ToastComponent,
    FirstLoginComponent,
    FeedingTrackerComponent,
    ExcretionTrackerComponent,
    MedicationTrackerComponent,
    TimerComponent,
    TrackItemsPipe,
    InventoryTrackerComponent,
  ],
  imports: [
    BrowserModule,
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
