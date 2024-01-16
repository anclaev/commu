import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'comduty-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  @Input() title: string = 'Отправить';
  @Output() handler: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = <FormGroup>this.controlContainer.control;
  }
}
