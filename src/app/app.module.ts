import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { StepperFormModule } from './stepper-form/stepper-form.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { LoaderService } from './core/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StepperFormModule,
    HttpClientModule,
    LoaderComponent
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    },
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
