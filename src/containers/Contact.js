import React from 'react';
import classes from '../css/Contact.module.css';
import BigLogo from '../components/Logo/BigLogo';
import Layout from '../hoc/Layout/Layout';
import ContactForm from '../components/Contact/ContactForm';
import ErrorBoundary from '../components/ErrorBoundary';

function Contact() {
  return (
    <Layout>
    <div className="col-md-3"></div>
    <div className={['col-md-6',classes.Container].join(' ')}>
      <h2>צור קשר</h2>
      <hr></hr>
      <p className={classes.Content}>
     יש לך שאלה, בקשה או המלצה?<br />
    נשמח שתיצור איתנו קשר.<br /> 
     <b>dreamcreamshop@gmail.com</b>
      </p>
      <div className={classes.Form}>
        <ErrorBoundary>
          <ContactForm />
        </ErrorBoundary>
      </div>
      <BigLogo />
    </div>
    <div className="col-md-3"></div>
  </Layout>
  );
}

export default Contact;
