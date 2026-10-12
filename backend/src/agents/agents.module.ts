import { Module } from '@nestjs/common';
import { InvestorAgent } from './investor.agent';
import { MarketAgent } from './market.agent';
import { PitchAgent } from './pitch.agent';
import { PipelineService } from './pipeline.service';
import { PmAgent } from './pm.agent';
import { ResearchAgent } from './research.agent';
import { ValidationAgent } from './validation.agent';

@Module({
  providers: [
    ResearchAgent,
    MarketAgent,
    InvestorAgent,
    PmAgent,
    PitchAgent,
    ValidationAgent,
    PipelineService,
  ],
  exports: [ResearchAgent, PipelineService],
})
export class AgentsModule {}
