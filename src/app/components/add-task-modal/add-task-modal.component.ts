// add-task-modal.component.ts
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-add-task-modal',
  imports: [CommonModule,MatIconModule,FormsModule, MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html'
})
export class AddTaskModalComponent {
  @ViewChild('modal') modalTemplate!: TemplateRef<any>;
  @Input() taskToEdit?: Task;  // Receive task for editing
  @Output() taskUpdated = new EventEmitter<void>();
  
  taskForm: FormGroup;
  isEditMode = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['medium', Validators.required]
    });
  }

  // Open modal (now handles both add and edit)
  openModal(task?: Task) {
    this.isEditMode = !!task;
    this.taskToEdit = task;
    
    // Reset form with task data (if editing)
    this.taskForm.reset({
      title: task?.title || '',
      priority: task?.priority || 'medium'
    });

    this.dialog.open(this.modalTemplate, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'custom-modal'
    });
  }

  // Close modal
  closeModal() {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskToEdit) {
        // EDIT CASE: Create complete task object with existing ID
        const updatedTask: Task = {
          id: this.taskToEdit.id, // Keep original ID
          title: this.taskForm.value.title!,
          priority: this.taskForm.value.priority!,
          completed: this.taskToEdit.completed // Preserve completion status
        };
        this.taskService.updateTask(updatedTask);
      } else {
        // ADD CASE: Let service handle ID generation
        this.taskService.addTask(
          this.taskForm.value.title!,
          this.taskForm.value.priority!
        );
      }
  
      this.taskUpdated.emit();
      this.taskForm.reset({ priority: 'medium' });
      this.dialog.closeAll();
    }
  }
}