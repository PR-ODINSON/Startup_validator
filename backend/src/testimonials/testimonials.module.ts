import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService]
})
export class TestimonialsModule {} 