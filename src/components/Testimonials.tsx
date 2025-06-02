// src/components/Testimonials.tsx
'use client';

import React, { useState } from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
                                                           name,
                                                           role,
                                                           content,
                                                           avatar,
                                                         }) => {
  return (
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
            {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover rounded-xl" />
            ) : null}
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-gray-600">{role}</p>
          </div>
        </div>
        <p className="text-gray-600 italic">"{content}"</p>
        <div className="flex mt-6">
          {[...Array(5)].map((_, i) => (
              <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
          ))}
        </div>
      </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: TestimonialCardProps[] = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content:
          'LaLaba Clean transformed my home! Their attention to detail is incredible. My house has never looked better, and they used eco-friendly products which is important to me.',
      avatar: '',
    },
    {
      name: 'Michael Chen',
      role: 'Office Manager',
      content:
          "We've been using their office cleaning service for 6 months now and couldn't be happier. Professional, reliable, and thorough. Our workspace has never been cleaner!",
      avatar: '',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Busy Parent',
      content:
          "As a working parent, I don't have time for deep cleaning. LaLaba Clean has been a lifesaver. They're punctual, professional, and my kids love how fresh the house smells after they visit.",
      avatar: '',
    },
  ];

  return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about
              our cleaning services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TestimonialCard {...testimonials[activeIndex]} />

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                          activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Testimonials;
