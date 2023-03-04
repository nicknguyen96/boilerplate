import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationRoutingModule } from './animation-routing.module';
import { AnimationComponent } from './animation.component';
import { CanvasComponent } from './components/canvas/canvas.component';


@NgModule({
  declarations: [
    AnimationComponent,
    CanvasComponent
  ],
  imports: [
    CommonModule,
    AnimationRoutingModule
  ]
})
export class AnimationModule { }
