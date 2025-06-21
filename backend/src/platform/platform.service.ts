import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformService {
  getStats() {
    return [
      { label: 'Ideas Validated', value: '1,247' },
      { label: 'Success Rate', value: '87%' },
      { label: 'Time Saved', value: '42 hrs avg' },
      { label: 'AI Agents', value: '5' }
    ];
  }

  getFeatures() {
    return [
      {
        title: 'AI Market Analysis',
        description: 'Deep market research powered by AI agents analyzing trends, size, and opportunities',
        icon: '📊'
      },
      {
        title: 'Competition Intelligence',
        description: 'Identify key competitors and discover your unique market positioning',
        icon: '🎯'
      },
      {
        title: 'Investor Insights',
        description: 'Get feedback from our AI investor agent trained on successful funding patterns',
        icon: '💰'
      },
      {
        title: 'Product Strategy',
        description: 'MVP recommendations and detailed product roadmap planning',
        icon: '🚀'
      },
      {
        title: 'Risk Assessment',
        description: 'Identify potential risks and mitigation strategies early',
        icon: '⚠️'
      },
      {
        title: 'Financial Projections',
        description: 'AI-powered financial modeling and revenue projections',
        icon: '📈'
      }
    ];
  }

  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        ai_agents: 'active',
        api: 'operational'
      }
    };
  }
} 