import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './card-modal.component.html'
})
export class CardModalComponent {
  @Output() onHideModal: EventEmitter<number> = new EventEmitter<number>();
  _cardForm: FormGroup = {} as FormGroup;
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _taskService: TaskService,
    private _toastService: ToastrService
  ) {
    this._cardForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
  }

  getTaskForm(): Partial<Task> {
    return {
      title: this._cardForm.get('title')?.value,
      description: this._cardForm.get('description')?.value
    }
  }

  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this._cardForm.get(controlName);
    return control?.hasError(errorName) && (control?.dirty || control?.touched)
  }

  getErrorMessage(controlName: string): string {
    const control = this._cardForm.controls[controlName];
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('maxlength')) {
      return `Este campo debe tener menos de ${control.errors?.['maxlength'].requiredLength} carácteres.`;
    }
    if (control?.hasError('minlength')) {
      return 'Este campo debe tener al menos 3 caracteres.';
    }
    return '';
  }

  async onSubmit() {
    if(this._cardForm.invalid) {
      this._cardForm.markAllAsTouched()
      this.errorMessage = 'Los datos ingresados no son válidos, por favor intente nuevamente.';
      return;
    }

    const newTask = this._cardForm.value
    this.errorMessage = null;

    this._taskService.createTask(newTask).subscribe({
      next: () => {
        this._toastService.success('Tarea creada correctamente');
        this.hideModal(1);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Ocurrió un error al intentar guardar la tarea, por favor intente nuevamente.';
      }
    })
  }

  hideModal(type: number): void {
    this.onHideModal.emit(type);
  }
}
