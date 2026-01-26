import React from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 60px 0px 100px 0px;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0px 20px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 8px 32px;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ContactSubtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
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
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredStar = styled.span`
  color: #ff4757;
  font-size: 12px;
`;

const ContactInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + '20'};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.text_secondary};
  }
`;

const ContactInputMessage = styled.textarea`
  width: 100%;
  background-color: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary + '50'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + '20'};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.text_secondary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 18px 16px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(148, 0, 211, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
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

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  max-width: 200px;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
`;

const InfoText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic form validation
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
        setOpen(true);
        form.current.reset();
        setLoading(false);
      },
      error => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Email send error:', error.text);
        }
        setError('Failed to send message. Please try again or email directly.');
        setLoading(false);
      }
    );
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Get In Touch</Title>
        <Desc>
          Looking for a <strong>React Developer</strong> or <strong>Full Stack Engineer</strong>?
          Whether you have a project in mind, need consultation on{' '}
          <strong>web performance optimization</strong>, or want to discuss{' '}
          <strong>modern UI development</strong> opportunities, I&apos;d love to connect. Let&apos;s
          build something amazing together.
        </Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Send a Message</ContactTitle>
          <ContactSubtitle>
            Interested in <strong>responsive web design</strong>,{' '}
            <strong>JavaScript projects</strong>, or <strong>React.js development</strong>?
            Let&apos;s discuss how I can help bring your ideas to life.
          </ContactSubtitle>

          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <InputGroup>
            <InputLabel>
              Your Name <RequiredStar>*</RequiredStar>
            </InputLabel>
            <ContactInput placeholder="John Doe" name="from_name" required disabled={loading} />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              Your Email <RequiredStar>*</RequiredStar>
            </InputLabel>
            <ContactInput
              placeholder="john@example.com"
              name="from_email"
              type="email"
              required
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Subject</InputLabel>
            <ContactInput
              placeholder="Project Inquiry, Collaboration, or Job Opportunity"
              name="subject"
              disabled={loading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              Your Message <RequiredStar>*</RequiredStar>
            </InputLabel>
            <ContactInputMessage
              placeholder="Hello Usman, I'd like to discuss a project involving React.js and modern web technologies..."
              name="message"
              rows="6"
              required
              disabled={loading}
            />
          </InputGroup>

          <ContactButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </ContactButton>
        </ContactForm>

        <ContactInfo>
          <InfoItem>
            <InfoIcon>📍</InfoIcon>
            <InfoText>Location</InfoText>
            <InfoValue>Karachi, Pakistan</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoIcon>💼</InfoIcon>
            <InfoText>Availability</InfoText>
            <InfoValue>Open to Opportunities</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoIcon>⚡</InfoIcon>
            <InfoText>Response Time</InfoText>
            <InfoValue>Within 24 Hours</InfoValue>
          </InfoItem>
        </ContactInfo>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Message sent successfully! I&apos;ll get back to you soon.
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
