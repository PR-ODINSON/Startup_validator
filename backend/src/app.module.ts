import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ValidationModule } from './validation/validation.module';
import { ProcessingModule } from './processing/processing.module';
import { AnalysisModule } from './analysis/analysis.module';
import { PlatformModule } from './platform/platform.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ValidationModule,
    ProcessingModule,
    AnalysisModule,
    PlatformModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 