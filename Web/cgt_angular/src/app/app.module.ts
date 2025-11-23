import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
import { CareTakenDetailsComponent } from './home/care-taken-details/care-taken-details.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CareTakenDetailsEffects } from './store/care-taken-details/care-taken-details.effects';
import { careTakenDetailReducer, careTakenDetailsReducer } from './store/care-taken-details/care-taken-details.reducer';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { MainCardComponent } from './main/main-card/main-card.component';
import { SignupComponent } from "src/app/main/signup/signup.component";
import { LoginComponent } from "src/app/main/login/login.component";
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HomeComponent,
        FirstLoginComponent,
        FeedingTrackerComponent,
        ExcretionTrackerComponent,
        MedicationTrackerComponent,
        InventoryTrackerComponent,
        CareTakenDetailsComponent,
        MainCardComponent,
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        NgbNavModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot({ caretakendetail: careTakenDetailReducer, caretakendetails: careTakenDetailsReducer }),
        EffectsModule.forRoot([CareTakenDetailsEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        SharedModule],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthConfigInterceptor,
        //     multi: true,
        // },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
