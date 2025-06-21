import { Injectable } from '@nestjs/common';

@Injectable()
export class TestimonialsService {
  getFeaturedTestimonials() {
    return [
      {
        id: 1,
        name: 'Sarah Chen',
        role: 'Founder, TechStart',
        content: 'This AI validation tool saved me weeks of research. The insights were incredibly detailed and spot-on!',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff',
        rating: 5,
        featured: true
      },
      {
        id: 2,
        name: 'Mike Johnson',
        role: 'Product Manager, InnovateCorp',
        content: 'The AI agents provided incredible depth of analysis. Helped us pivot our strategy before wasting resources.',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff',
        rating: 5,
        featured: true
      },
      {
        id: 3,
        name: 'Elena Rodriguez',
        role: 'CEO, StartupXYZ',
        content: 'The investor perspective was invaluable. We used the insights to refine our pitch and secured funding!',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=ec4899&color=fff',
        rating: 5,
        featured: true
      }
    ];
  }

  submitTestimonial(testimonialData: any) {
    // In a real app, this would save to database
    return {
      success: true,
      message: 'Testimonial submitted successfully',
      id: Date.now() // Mock ID
    };
  }
} 