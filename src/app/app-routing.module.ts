import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/dynamic-form/dynamic-form.module').then(
        (m) => m.DynamicFormModule
      ),
  },
  {
    path: 'submissionSuccess',
    loadChildren: () =>
      import('./pages/result/result.module').then((m) => m.ResultModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
