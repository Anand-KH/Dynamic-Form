import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzStepsModule } from 'ng-zorro-antd/steps';

const routes: Routes = [
  {
    path: '',
    component: DynamicFormComponent,
  },
];

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    NzStepsModule,
    NzMessageModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzRadioModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSelectModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
