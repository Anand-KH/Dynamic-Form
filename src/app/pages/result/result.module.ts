import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
  },
];

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzResultModule,
    NzButtonModule,
  ],
  exports: [ResultComponent],
})
export class ResultModule {}
