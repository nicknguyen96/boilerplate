import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BindingRoutingModule } from './binding-routing.module';
import { BindingComponent } from './binding.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildrenComponent } from './children/children.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BindingComponent,
    ChildrenComponent
  ],
  imports: [
    CommonModule,
    BindingRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class BindingModule { }
