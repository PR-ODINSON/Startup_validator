import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';

@ApiTags('testimonials')
@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get('featured')
  @ApiOperation({ summary: 'Get featured testimonials' })
  @ApiResponse({ status: 200, description: 'Featured testimonials retrieved successfully' })
  getFeaturedTestimonials() {
    return this.testimonialsService.getFeaturedTestimonials();
  }

  @Post()
  @ApiOperation({ summary: 'Submit a new testimonial' })
  @ApiResponse({ status: 201, description: 'Testimonial submitted successfully' })
  submitTestimonial(@Body() testimonialData: any) {
    return this.testimonialsService.submitTestimonial(testimonialData);
  }
} 