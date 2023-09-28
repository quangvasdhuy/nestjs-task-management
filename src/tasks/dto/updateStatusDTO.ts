import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class updateStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
