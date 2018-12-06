import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductModule } from './products/product.module';
//import { StoreModule }  from  '@ngrx/store';
//ngRX Dev tools
//import { StoreDevtoolsModule} from  '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

//import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    //StoreModule.forRoot({}),
    //EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument({
    //   name : 'APM Demo Application',
    //   maxAge:25,
    //   logOnly:environment.production
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
