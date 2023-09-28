import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status-enum';

export class updateStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
