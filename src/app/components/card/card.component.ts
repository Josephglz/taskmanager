import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() task: Task = {} as Task;
  @Output() onTaskDeleted: EventEmitter<void> = new EventEmitter();

  constructor(
    private _taskService: TaskService,
    private _toastr: ToastrService,
  ) {}

  deleteTask(): void {
    this._taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this._toastr.success('Task deleted successfully');
        this.onTaskDeleted.emit();
      },
      error: (error) => {
        this._toastr.error('An error occurred while deleting the task');
      }
    });
  }
}
