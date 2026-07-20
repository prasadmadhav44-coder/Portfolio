import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Phone, Mail as MailIcon, Github, Linkedin, FileText, Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const sanitizeInput = (input) => input.replace(/[<>&"']/g, '').trim();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone', value: '+91 6384360663' },
  { icon: MailIcon, label: 'Email', value: 'prasadmadhav44@gmail.com' },
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/prasadmadhav44-coder' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/madhavaprasadkg/' },
  { icon: FileText, label: 'Resume', href: '/Madhava_Prasad_Resume.pdf' },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.name.length > 100) newErrors.name = 'Name must be under 100 characters';
    if (formData.email.length > 100) newErrors.email = 'Email must be under 100 characters';
    if (formData.message.length > 1000) newErrors.message = 'Message must be under 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      setToast({ type: 'error', message: 'Configuration error. Please try again later.' });
      return;
    }

    setIsLoading(true);
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        sanitizedData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsLoading(false);
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
          setToast({ type: 'success', message: 'Message sent successfully!' });
          if (ReactGA.isInitialized) {
            ReactGA.event({ category: 'Contact Form', action: 'Submit', label: sanitizedData.email });
          }
        },
        (err) => {
          setIsLoading(false);
          const errorMessage = err.text?.includes('timeout')
            ? 'Request timed out. Please try again.'
            : err.text?.includes('invalid')
            ? 'Invalid configuration. Please try again later.'
            : 'Could not send message. Try again later.';
          setToast({ type: 'error', message: errorMessage });
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const fields = [
    { label: 'Name', type: 'text', id: 'name' },
    { label: 'Email', type: 'email', id: 'email' },
    { label: 'Message', type: 'textarea', id: 'message' },
  ];

  return (
    <section id="contact" className="contact py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Get In Touch
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                Let's Connect
              </h3>
              <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
                Have a project in mind or just want to chat? Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="p-6 rounded-2xl border transition-all duration-300"
                  style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm opacity-75" style={{ color: 'var(--color-muted)' }}>{label}</p>
                      <p className="text-lg font-semibold break-all" style={{ color: 'var(--color-text)' }}>{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6"
            >
              <p className="text-sm mb-4 opacity-75" style={{ color: 'var(--color-muted)' }}>
                Connect with me
              </p>
              <div className="flex space-x-4">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl transition-all"
                    style={{ backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-6">
              {fields.map((field, idx) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="relative"
                >
                  <label htmlFor={field.id} className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    {field.label}
                  </label>

                  {field.type !== 'textarea' ? (
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        borderColor: errors[field.id] ? '#ef4444' : 'var(--color-border)',
                        backgroundColor: 'var(--color-card)',
                        color: 'var(--color-text)',
                      }}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      aria-invalid={!!errors[field.id]}
                      aria-describedby={`${field.id}-error`}
                    />
                  ) : (
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 resize-none"
                      style={{
                        borderColor: errors[field.id] ? '#ef4444' : 'var(--color-border)',
                        backgroundColor: 'var(--color-card)',
                        color: 'var(--color-text)',
                      }}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      aria-invalid={!!errors[field.id]}
                      aria-describedby={`${field.id}-error`}
                    />
                  )}

                  <AnimatePresence>
                    {errors[field.id] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        id={`${field.id}-error`}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors[field.id]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
                aria-label="Send message"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center space-x-3"
            style={
              toast.type === 'success'
                ? { backgroundColor: 'var(--color-accent)', color: '#ffffff' }
                : { backgroundColor: '#ef4444', color: '#ffffff' }
            }
            role="alert"
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
