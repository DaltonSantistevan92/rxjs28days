import { CombineLatestAllComponent } from './shared/components/combine-latest-all/combine-latest-all.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactModule } from './pages/contact/contact.module';
import { StartStopComponent } from './shared/components/start-stop/start-stop.component';

import { SingleComponent } from './shared/components/single/single.component';
import { StartWithComponent } from './shared/components/start-with/start-with.component';
import { FromEventComponent } from './shared/components/from-event/from-event.component';
import { WithLatestFromComponent } from './shared/components/with-latest-from/with-latest-from.component';
import { HttpClientModule } from '@angular/common/http';
import { ConcatWithComponent } from './shared/components/concat-with/concat-with.component';
import { SubjectComponent } from './shared/components/subject/subject.component';
import { BehaviourSubjectComponent } from './shared/components/behaviour-subject/behaviour-subject.component';
import { ErrorHandleComponent } from './shared/components/error-handle/error-handle.component';
import { CachingComponent } from './shared/components/caching/caching.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotFoundComponent,
    ContactModule,
    StartStopComponent,
    SingleComponent,
    StartWithComponent,
    FromEventComponent,
    CombineLatestAllComponent,
    WithLatestFromComponent,
    HttpClientModule,
    ConcatWithComponent,
    SubjectComponent,
    BehaviourSubjectComponent,
    ErrorHandleComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
