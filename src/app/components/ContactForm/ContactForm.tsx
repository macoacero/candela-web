import { useState } from 'react';
import Image from 'next/image';
import './ContactForm.scss';
import LegalLinks from '../LegalLinks/LegalLinks';

interface ContactFormProps {
  closeForm: () => void;
  handleLegalLinkClick?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ closeForm, handleLegalLinkClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [emptyField, setEmptyField] = useState({
    name: false,
    email: false,
  });

  const [status, setStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setEmptyField({ ...emptyField, [id]: value.trim() === '' });
  };

  const validateEmail = (email: string) => {
    if (email.trim() === '') {
      return true; 
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
  
    const { name, email } = formData;
    const isNameNotEmpty = name.trim() !== '';
    const isEmailNotEmpty = email.trim() !== '';
  
    setEmptyField({
      name: !isNameNotEmpty,
      email: !isEmailNotEmpty
    });
  
    if (!isNameNotEmpty || !isEmailNotEmpty) {
      return;
    }
  
    if (email.trim() !== '' && !validateEmail(email)) {
      setEmptyField({ ...emptyField, email: true });
      return;
    }
  
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (res.status === 200) {
        setStatus('ok');
        setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      } else {
        setStatus('Error sending email');
      }
    } catch (error) {
      setStatus('Error sending email');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Say “hi” or something you want us to know</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="close-button" onClick={closeForm}>
          <Image 
            src="/close-btn.svg" 
            alt="close" 
            width={20} 
            height={20} 
          />
        </div>
      {status === 'ok' ? (
        <div className="success-message">
            <Image 
                src="/form-sended.svg" 
                alt="close" 
                width={156} 
                height={156} 
                className='form-sended-image'
              />
            <h3>¡Your message is now on the way!</h3>
            <p className='message-text'>Thank you for writing to us. In the shortest time imaginable, someone will respond to you with pure Candela.</p>
        </div>
      ) : (
        <>
          <div className='form-group-container'>
            <div className={`form-group ${emptyField.name ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="name">Name / Enterprise*</label>
              <input
                id="name"
                type="text"
                placeholder="Write your name here"
                value={formData.name}
                onChange={handleChange}
                className={emptyField.name ? 'error' : 'input'}
              />
              {emptyField.name && <p className="error-message">This field is required.</p>}
            </div>
            <div className={`form-group ${emptyField.email ? 'has-error' : ''}`}>
              <label className="form-label" htmlFor="email">eMail*</label>
              <input
                id="email"
                type="text"
                placeholder="Write a valid eMail"
                value={formData.email}
                onChange={handleChange}
                className={emptyField.email || !validateEmail(formData.email) ? 'error' : 'input'}
              />
              {emptyField.email ? <p className="error-message">This field is required.</p> : !validateEmail(formData.email) && !emptyField.email && <p className="error-message">Please enter a valid email.</p>}
            </div>
            <div className='form-group'>
              <label className="form-label" htmlFor="phone-number">Phone number</label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Write your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className='input'
              />
            </div>
          </div>
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            className='textarea'
            id="message"
            placeholder="Write your message here..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />
          <button className="submit-button" type="submit">Send</button>
        </>
      )}
      </form>
      <LegalLinks handleLegalLinkClick={handleLegalLinkClick} />
    </div>
  );
};

export default ContactForm;
