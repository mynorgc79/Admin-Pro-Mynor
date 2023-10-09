import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputType } from '@core/models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomLabelDirective } from '@shared/directives';

@Component({
  selector: 'shared-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomLabelDirective],
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input()
  public labelTitle!: string;

  @Input()
  public labelStyle: string = '';

  @Input()
  public type: InputType = 'text';

  @Input()
  placeholder: string = '';

  @Input()
  public control!: FormControl;
}
