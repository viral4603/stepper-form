import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { LoaderService } from './core/loader/loader.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { StepperFormModule } from './stepper-form/stepper-form.module';

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
