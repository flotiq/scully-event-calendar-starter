import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { ApiModule, Configuration, ConfigurationParameters } from 'flotiq';
import {HttpClientModule} from '@angular/common/http';
import { CalendarComponent } from './calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ModalComponent } from './calendar/modal/modal.component';
import {CommonModule} from '@angular/common';
import {EventComponent} from './pages/event/event.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { EventDetailsComponent } from './shared/event-details/event-details.component';

// Configure flotiq API
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    apiKeys: {'X-AUTH-TOKEN': environment.flotiqApiKey}
  };
  return new Configuration(params);
}

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    HomeComponent,
    ModalComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    FullCalendarModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
