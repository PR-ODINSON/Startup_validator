import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlatformService } from './platform.service';

@ApiTags('platform')
@Controller('api/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get platform statistics' })
  @ApiResponse({ status: 200, description: 'Platform statistics retrieved successfully' })
  getStats() {
    return this.platformService.getStats();
  }

  @Get('features')
  @ApiOperation({ summary: 'Get platform features' })
  @ApiResponse({ status: 200, description: 'Platform features retrieved successfully' })
  getFeatures() {
    return this.platformService.getFeatures();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get platform health status' })
  @ApiResponse({ status: 200, description: 'Platform health status retrieved successfully' })
  getHealth() {
    return this.platformService.getHealth();
  }
} 