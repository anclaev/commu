import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class SharedModule {}
