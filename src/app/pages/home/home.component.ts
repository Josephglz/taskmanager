import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardSkeletonComponent } from "../../components/card-skeleton/card-skeleton.component";
import { CardComponent } from "../../components/card/card.component";
import { CardModalComponent } from "../../components/card-modal/card-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardSkeletonComponent,
    CardComponent,
    CardModalComponent
],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  taskList: Task[] = [];
  loading: boolean = true;
  showModal: boolean = false;

  constructor(
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskList = [];
    this._taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.taskList = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    })
  }

  onTaskDeleted(): void {
    this.loadTasks();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onModalClosed($event: number): void {
    this.toggleModal();
    if($event === 1) {
      this.loadTasks();
    }
  }
}
