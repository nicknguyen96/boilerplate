import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'binding', loadChildren: () => import('./binding/binding.module').then(m => m.BindingModule) },
  { path: 'animation', loadChildren: () => import('./animation/animation.module').then(m => m.AnimationModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
