import { Module } from '@nestjs/common';
import { AgentsModule } from '../agents/agents.module';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [AgentsModule],
  controllers: [ValidationController],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {} 