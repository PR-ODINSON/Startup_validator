import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProcessingService } from './processing.service';

@ApiTags('processing')
@Controller('processing')
export class ProcessingController {
  constructor(private processingService: ProcessingService) {}

  @Get('status')
  async getStatus() {
    return this.processingService.getStatus();
  }
} 