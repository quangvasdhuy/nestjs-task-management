import { TaskStatus } from '../tasks.model';

export class getTaskFilterDTO {
  status?: TaskStatus;
  search?: string;
}
