'use client';
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <svg
          className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-3 pr-8">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: 'What areas do you serve?',
      answer:
        'We currently serve the entire metropolitan area including downtown and all surrounding suburbs. Please check our booking system for availability in your specific neighborhood.',
    },
    {
      question: 'Are your cleaning products eco-friendly?',
      answer:
        "Yes! We're committed to sustainability. All our cleaning products are non-toxic, biodegradable, and safe for children and pets. We avoid harsh chemicals while still delivering exceptional cleaning results.",
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'We require 24 hours notice for cancellations or rescheduling. Cancellations made less than 24 hours before the appointment may be subject to a $50 fee. We understand emergencies happen and will work with you on a case-by-case basis.',
    },
    {
      question: 'Do I need to be home during the cleaning?',
      answer:
        "Most of our clients aren't home during their cleaning appointments. We're fully insured and background-checked for your peace of mind. You can provide access instructions that work best for you - key, lockbox, or garage code.",
    },
    {
      question: 'How do you ensure quality?',
      answer:
        "We have a 100% satisfaction guarantee. If you're not completely happy with any aspect of your cleaning, let us know within 24 hours and we'll return to re-clean the area at no additional charge. We also perform random quality checks to ensure consistent service.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our cleaning services, policies, and procedures.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
