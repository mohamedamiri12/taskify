// task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'taskify_tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  
  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    this.tasks = savedData ? JSON.parse(savedData) : []
    this.tasksSubject.next(this.tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  
  private saveTasks() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }
  
  private updateState() {
    this.tasksSubject.next(this.tasks);
    this.saveTasks(); // Persist changes
  }
  
  

  addTask(title: string, priority: 'low' | 'medium' | 'high'): void {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false,
      priority
    };
    this.tasks.push(newTask);
    this.updateState()
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
    this.updateState()
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    this.updateState()
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  
  
}