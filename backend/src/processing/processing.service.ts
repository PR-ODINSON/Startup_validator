import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessingService {
  async getStatus() {
    return {
      status: 'running',
      activeJobs: 3,
      queueSize: 5,
    };
  }
}