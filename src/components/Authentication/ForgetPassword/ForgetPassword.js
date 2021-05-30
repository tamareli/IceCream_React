import classes from '../../../css/Form.module.css';
import React from 'react';
import Input from '../../UI/Input/Input';
import { Component } from 'react';
import GreenButton from '../../UI/Button/GreenButton';
import { checkValidity } from '../../../shared/validate';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner'
import ErrorMessageForm from '../../UI/Error/FormErrorMessage'
import Layout from '../../../hoc/Layout/Layout'

class ForgetPassword extends Component {
  state = {
    sent: false,
    emailNotExistErr: null,
    hasError: false,
    user: {
      email: '',
    },
    userValidationRules: {
      email: {
        required: true,
        regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    userValid: {
      email: { valid: false, touched: false, errmessage: '' },
    },
    isValidForm: false,
    loading: false
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    let updatedUser = this.state.user;
    let validUser = this.state.userValid;
    updatedUser[input] = e.target.value;
    validUser[input].touched = true;
    validUser[input].errmessage = checkValidity(
      updatedUser[input],
      this.state.userValidationRules[input]
    );
    validUser[input].valid = validUser[input].errmessage === '';

    let validForm = true;
    for (let field in validUser) {
      validForm = validUser[field].valid && validForm;
    }
    this.setState({
      user: updatedUser,
      userValid: validUser,
      isValidForm: validForm,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    const emailObj = {
      emailAddress: this.state.user.email,
      subject: '',
      body: '',
    };
    axios
      .post('email/forgotPassword', emailObj)
      .then((res) => {
        this.setState({ sent: true, loading: false, hasError: false });
      })
      .catch((err) => {
        if(err.response.status === 404){
          this.setState({ hasError: true, loading: false });
        }
        else{
        this.setState({
          emailNotExistErr: err.response.data.Message, loading: false
        });
      }
      });
  };

  render() {
    if(this.state.loading){
      return <Layout> <Spinner /></Layout>
    }
    if(this.state.hasError){
      return (
      <Layout>
        <div className="container"> 
            <ErrorMessageForm />
        </div>
      </Layout>)
    }
    if (this.state.sent === true) {
      return (
        <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4 d-flex flex-column justify-content-center align-items-center'>
              <i
                className='far fa-check-circle fa-4x'
                style={{ margin: '1.5rem', color: 'var(--green-color)' }}
              ></i>
              <h4>.הסיסמה נשלחה בהצלחה</h4>
              <p>בדוק את תיבת האמייל שלך</p>
            </div>
            <div className='col-md-4'></div>
          </div>
        </div>
        </Layout>
      );
    }
    return (
      <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className={[classes.ForgotPasswordForm, 'col-md-4'].join(' ')}>
            <p style={{ fontSize: '18px', textAlign: 'center' }}>
              הכנס/י את כתובת האימייל שלך וקבל סיסמה חדשה
            </p>

            <form className={classes.Form} onSubmit={this.onSubmitHandler}>
              <Input
                type='email'
                name='email'
                inputtype='input'
                label='אימייל'
                value={this.state.email}
                onChange={this.handleChange('email')}
                invalid={(!this.state.userValid.email.valid).toString()}
                touched={this.state.userValid.email.touched.toString()}
                errmessage={this.state.userValid.email.errmessage}
              />
              <p style={{ color: 'red' }}>{this.state.emailNotExistErr}</p>

              <GreenButton
                text='קבל סיסמה'
                type='submit'
                disabled={!this.state.isValidForm}
              ></GreenButton>
            </form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
      </Layout>
    );
  }
}

export default ForgetPassword;
