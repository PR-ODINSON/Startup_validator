import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationService } from './validation.service';

@ApiTags('validation')
@Controller('validation')
export class ValidationController {
  constructor(private validationService: ValidationService) {}

  @Post('submit-idea')
  @ApiOperation({ summary: 'Submit a startup idea for validation' })
  @ApiResponse({ status: 201, description: 'Idea submitted successfully' })
  async submitIdea(@Body() ideaData: any) {
    return this.validationService.submitIdea(ideaData);
  }

  @Get('results/:id')
  @ApiOperation({ summary: 'Get validation results for a submitted idea' })
  @ApiResponse({ status: 200, description: 'Validation results retrieved' })
  async getValidationResults(@Param('id') id: string) {
    return this.validationService.getValidationResults(id);
  }
} 