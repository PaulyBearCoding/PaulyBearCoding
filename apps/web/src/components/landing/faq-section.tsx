'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is GJYL really free to use?',
    answer:
      'Yes, GJYL is completely free to use. We believe in providing a great social experience without charging users.',
  },
  {
    question: 'How does GJYL protect my privacy?',
    answer:
      'We use end-to-end encryption for messages, never sell your data, and give you full control over your privacy settings. Your data stays yours.',
  },
  {
    question: 'Can I use GJYL on mobile devices?',
    answer:
      'Yes, GJYL is fully responsive and works great on mobile browsers. We also have dedicated mobile apps coming soon.',
  },
  {
    question: 'What makes GJYL different from other platforms?',
    answer:
      'GJYL combines chat, feed, and live streaming in one privacy-first platform. No ads, no tracking, just pure connection.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Simply sign up with your email or use one of our OAuth providers. Create your profile, add friends, and start connecting!',
  },
];

export function FAQSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have a different question? Contact our support team.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
