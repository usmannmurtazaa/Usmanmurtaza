import React from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import { useReducedMotion, fadeInUpVariants, springTransition } from '../../motionConfig';
import { trackContactForm } from '../../analytics';
import { Icon } from '../common/Icon';

/* ---------- Styled Components (Glassmorphism + Design System) ---------- */

const ContactSection = styled.section`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(12, 12, 29, 0.4);

  @media (max-width: 960px) {
    padding: 60px 0 100px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
`;

const Title = styled(motion.h2)`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
  color: var(--text-secondary);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
  }
`;

const FormCard = styled(motion.form)`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: var(--bg-glass, rgba(18, 18, 35, 0.6));
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.1));
  border-radius: 1.5rem;
  padding: 40px 32px;
  box-shadow: var(--shadow-md, 0 8px 30px rgba(0, 0, 0, 0.6));
  gap: 20px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: var(--shadow-glow, 0 0 20px rgba(139, 92, 246, 0.25));
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const FormHeading = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FormSubtitle = styled.div`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredStar = styled.span`
  color: #ff4757;
  font-size: 12px;
`;

const GlassInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: var(--text-primary);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid var(--accent-glow, #8b5cf6);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GlassTextarea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: var(--text-primary);
  border-radius: 12px;
  padding: 16px;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid var(--accent-glow, #8b5cf6);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  text-align: center;
  background: var(--accent-gradient, linear-gradient(135deg, #8b5cf6, #3b82f6));
  padding: 18px 16px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  margin-top: 10px;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 25px rgba(139, 92, 246, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  min-width: 180px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.25);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
  }
`;

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  color: #8b5cf6; /* accent color for icons */
`;

const InfoText = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

/* ---------- Component ---------- */

const Contact = () => {
  const prefersReduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(form.current);
    const email = formData.get('from_email');
    const name = formData.get('from_name');
    const message = formData.get('message');

    if (!email || !name || !message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    emailjs.sendForm('service_2004', 'template_2004', form.current, 'zi7G3LciN7Dv838Zv').then(
      result => {
        trackContactForm(); // analytics
        setOpen(true);
        form.current.reset();
        setLoading(false);
      },
      error => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Email send error:', error.text);
        }
        setError('Failed to send message. Please try again or email directly.');
        setLoading(false);
      }
    );
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <ContactSection id="contact">
      <Wrapper>
        <Title
          className="gradient-text"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </Title>

        <Desc
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Looking for a <strong>React Developer</strong> or <strong>Full Stack Engineer</strong>?
          Whether you have a project in mind, need consultation on{' '}
          <strong>web performance optimization</strong>, or want to discuss{' '}
          <strong>modern UI development</strong> opportunities, I&apos;d love to connect. Let&apos;s
          build something amazing together.
        </Desc>

        <FormCard
          ref={form}
          onSubmit={handleSubmit}
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FormHeading>Send a Message</FormHeading>
          <FormSubtitle>
            Interested in <strong>responsive web design</strong>,{' '}
            <strong>JavaScript projects</strong>, or <strong>React.js development</strong>?
            Let&apos;s discuss how I can help bring your ideas to life.
          </FormSubtitle>

          {error && (
            <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <InputGroup>
            <InputLabel>
              Your Name <RequiredStar>*</RequiredStar>
            </InputLabel>
            <GlassInput placeholder="John Doe" name="from_name" required disabled={loading} />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              Your Email <RequiredStar>*</RequiredStar>
            </InputLabel>
            <GlassInput
              placeholder="john@example.com"
              name="from_email"
              type="email"
              required
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Subject</InputLabel>
            <GlassInput
              placeholder="Project Inquiry, Collaboration, or Job Opportunity"
              name="subject"
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              Your Message <RequiredStar>*</RequiredStar>
            </InputLabel>
            <GlassTextarea
              placeholder="Hello Usman, I'd like to discuss a project involving React.js and modern web technologies..."
              name="message"
              rows="6"
              required
              disabled={loading}
            />
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={prefersReduced ? {} : { scale: 1.02 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
            transition={springTransition}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </FormCard>

        <ContactInfo
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <InfoCard>
            <InfoIcon aria-hidden="true">
              <Icon name="MapPin" size={28} />
            </InfoIcon>
            <InfoText>Location</InfoText>
            <InfoValue>Karachi, Pakistan</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoIcon aria-hidden="true">
              <Icon name="Briefcase" size={28} />
            </InfoIcon>
            <InfoText>Availability</InfoText>
            <InfoValue>Open to Opportunities</InfoValue>
          </InfoCard>

          <InfoCard>
            <InfoIcon aria-hidden="true">
              <Icon name="Zap" size={28} />
            </InfoIcon>
            <InfoText>Response Time</InfoText>
            <InfoValue>Within 24 Hours</InfoValue>
          </InfoCard>
        </ContactInfo>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%', borderRadius: '12px' }}
          >
            Message sent successfully! I&apos;ll get back to you soon.
          </Alert>
        </Snackbar>
      </Wrapper>
    </ContactSection>
  );
};

export default Contact;
