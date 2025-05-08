// add-task-modal.component.ts
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

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
  taskForm: FormGroup;

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

  // Open modal
  openModal() {
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

  // Submit new task
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(
        this.taskForm.value.title,
        this.taskForm.value.priority
      );
      this.taskForm.reset({ priority: 'medium' });
      this.closeModal();
    }
  }
}