import { NgModule } from '@angular/core';
import { StarComponent } from './star.component';
import { LoadingComponent } from './loading.component';


@NgModule({
  declarations: [StarComponent,LoadingComponent],
  imports: [
    
  ],
  exports: [
    StarComponent,
    LoadingComponent

  ]
})
export class SharedModule { }
