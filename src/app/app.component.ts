import { Component } from '@angular/core';
import { Task } from './models/task';
import { TaskComponent } from './components/task/task.component';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TaskComponent, AddTaskModalComponent, MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskify';
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks; // Auto-updates when tasks change
    });
  }

  onToggleComplete(task: Task) {
    this.taskService.updateTask(task);
  }

  onTaskDeleted(id: number) {
    this.taskService.deleteTask(id);
  }
  
  
  
}
