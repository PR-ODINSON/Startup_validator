import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  async getAnalysis(id: string) {
    return {
      id,
      type: 'market-analysis',
      data: {
        marketSize: '$10B',
        growth: '15%',
        competition: 'Medium',
      },
      generatedAt: new Date().toISOString(),
    };
  }
}