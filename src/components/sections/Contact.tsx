'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { sendEmail } from '@/utils/email';
import { socialLinks } from '@/constants';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Form status
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: '',
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: false, message: '' });
    
    try {
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      
      if (result.success) {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: result.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: error.message || 'Something went wrong. Please try again.',
      });
    }
  };
  
  return (
    <section 
      id="contact" 
      className="py-20 bg-dark-light"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Contact Me"
          subtitle="Get in touch for collaborations or questions"
        />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          {/* Contact Info */}
          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 bg-dark rounded-xl h-full border border-primary/10">
              <h3 className="text-2xl font-bold mb-6 neon-blue">Let's Connect</h3>
              
              <p className="text-light/80 mb-8">
                Interested in working together? Have questions about my work? 
                Feel free to reach out through the form or my social profiles.
              </p>
              
              {/* Social links */}
              <div className="flex flex-wrap gap-4 mb-10">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-light hover:bg-primary/20 transition-colors"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </motion.a>
                ))}
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-light/80">Your Location, City, Country</p>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:your.email@example.com" className="text-light hover:text-primary transition-colors">
                  your.email@example.com
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6 bg-dark rounded-xl border border-primary/10">
              <h3 className="text-2xl font-bold mb-6 neon-purple">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="text-light/80 mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-dark-light rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-light neon-glow"
                    />
                  </div>
                  
                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="text-light/80 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-dark-light rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-light neon-glow"
                    />
                  </div>
                </div>
                
                {/* Subject field */}
                <div>
                  <label htmlFor="subject" className="text-light/80 mb-1 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-dark-light rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-light neon-glow"
                  />
                </div>
                
                {/* Message field */}
                <div>
                  <label htmlFor="message" className="text-light/80 mb-1 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-dark-light rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-light neon-glow resize-none"
                  ></textarea>
                </div>
                
                {/* Form status message */}
                {status.message && (
                  <div className={`p-3 rounded-lg ${status.error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                    {status.message}
                  </div>
                )}
                
                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="inline-flex items-center justify-center rounded-md 
                      transition-all duration-300 ease-in-out neon-glow
                      bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/20
                      text-base py-2.5 px-5
                      w-full md:w-auto"
                  >
                    {status.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper function to render social icons
const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github':
      return (
        <svg className="w-5 h-5 text-light" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5 text-light" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5 text-light" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5 text-light" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-light" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </svg>
      );
  }
};

export default Contact;
