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
import { Subject } from 'rxjs';

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
  searchTerm: string = '';
  filteredTasks: Task[] = [];
  sortMethod: string = 'default';
  private searchTerms = new Subject<string>();
  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks; // Auto-updates when tasks change
      this.filterAndSortTasks();
    });

  }

  // Trigger updates
  onSearchInput(term: Event) {
    this.searchTerm = (term.target as HTMLInputElement).value
    this.filterAndSortTasks();
  }

  changeSort(method: Event) {
    this.sortMethod = (method.target as HTMLInputElement).value;
    this.filterAndSortTasks();
  }

  // Combined filtering + sorting
  filterAndSortTasks() {
    // Filter
    let tasks = this.searchTerm
      ? this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      : [...this.tasks];

    // Sort
    switch (this.sortMethod) {
      case 'priority':
        tasks.sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        break;
      case 'title':
        tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // 'default' retains original order
    }

    this.filteredTasks = tasks;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterAndSortTasks();
  }

  onToggleComplete(task: Task) {
    this.taskService.updateTask(task);
  }

  onTaskDeleted(id: number) {
    this.taskService.deleteTask(id);
  }



}
