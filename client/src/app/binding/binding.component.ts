import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.scss']
})
export class BindingComponent {
  
  
  constructor(private http : HttpClient, private fb : FormBuilder){

  }

  // form = new FormGroup({
  //   email : new FormControl('', [Validators.required, Validators.email])

  // })

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    email1: ['', [Validators.required, Validators.email]]

  })

  getErrorMessage(field : string) : string{
    
    const formControl = this.form.get(field);

    if (formControl?.hasError('required')){
      return 'You must enter a value';
    }

    return formControl?.hasError('email') ? 'Not a valid email' : '';
    
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
