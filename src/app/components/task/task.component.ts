import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskToggled = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Task>();



 
  toggleCompleted() {
    this.task.completed = !this.task.completed;
    console.log(this.task)
    this.taskToggled.emit(this.task);
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'; // low
    }
  }
  
  onDelete() {
    this.taskDeleted.emit(this.task.id);
  }
  
  onEdit() {
    this.edit.emit(this.task);
  }

}
