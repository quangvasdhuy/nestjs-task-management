import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { getTaskFilterDTO } from './dto/getTaskFilterDTO';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTasks(filterDTO: getTaskFilterDTO): Task[] {
    const { status, search } = filterDTO;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.description.includes(search) || task.title.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id === id);
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
