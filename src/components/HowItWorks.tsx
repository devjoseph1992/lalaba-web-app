// src/components/HowItWorks.tsx
'use client';

import React from 'react';

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-blue-600">{number}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
  );
};

const HowItWorks: React.FC = () => {
  const steps: StepProps[] = [
    {
      number: '1',
      title: 'Book Online',
      description:
          'Select your service and schedule a convenient time through our easy online booking system.',
    },
    {
      number: '2',
      title: 'Our Team Arrives',
      description:
          'Our professional cleaners arrive on time with all necessary equipment and eco-friendly supplies.',
    },
    {
      number: '3',
      title: 'Professional Cleaning',
      description:
          'We thoroughly clean your space according to our detailed checklist and your specific requests.',
    },
    {
      number: '4',
      title: 'Enjoy Your Space',
      description:
          'Relax and enjoy your freshly cleaned home. We guarantee your satisfaction with our service.',
    },
  ];

  return (
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Getting your home professionally cleaned has never been easier. Follow these simple
              steps to enjoy a spotless living space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
                <Step
                    key={index}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                />
            ))}
          </div>
        </div>
      </section>
  );
};

export default HowItWorks;
