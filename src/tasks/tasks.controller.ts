import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { createTaskDTO } from './dto/createTaskDTO';
import { getTaskFilterDTO } from './dto/getTaskFilterDTO';
import { updateStatusDTO } from './dto/updateStatusDTO';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: getTaskFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getFilterTasks(filterDTO);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: createTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('') updateStatusDTO: updateStatusDTO,
  ): Task {
    const { status } = updateStatusDTO;
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
