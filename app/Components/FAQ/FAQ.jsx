import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I apply for a job?",
      answer:
        "You can browse the job listings and click 'Apply Now' on the job you're interested in. Complete the form with your details and submit.",
    },
    {
      question: "Do I need an account to apply?",
      answer:
        "Yes, creating a free account lets you track your applications and save your favorite jobs.",
    },
    {
      question: "Is there any fee for job seekers?",
      answer:
        "No, our platform is completely free for job seekers. Companies pay to post jobs.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team anytime via the Contact Us page or by emailing support@example.com.",
    },
  ];

  return (
    <section className="py-16 bg-accent rounded-2xl">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus border border-secondary rounded-2xl shadow-lg bg-neutral"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold text-primary">
                {faq.question}
              </div>
              <div className="collapse-content text-secondary">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
