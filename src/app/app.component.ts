import { Component, OnInit } from '@angular/core';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stepper-form';
  //loader for hide and show loader
  public isLoader: boolean;
  constructor(private _loaderService: LoaderService) {
    this.isLoader = false;
  }
  ngOnInit(): void {
    this._loaderService.isLoader$.subscribe((res: boolean) => {
      setTimeout(()=>{
        this.isLoader = res;
      },1000)
    })
  }
}
