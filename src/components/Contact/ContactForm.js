import React, { Component } from 'react'
import Input from '../UI/Input/Input'
import classes from '../../css/Form.module.css'
import PinkButton from '../UI/Button/PinkButton'
import Spinner from '../UI/Spinner/Spinner'
import { checkValidity } from '../../shared/validate';
import axios from '../../axios'


export default class ContactForm extends Component {
    state = {
        sent: false,
        emailNotExistErr: null,
        user: {
            name:'',
            email: '',
            content: ''
        },
        userValidationRules: {
          email: {
            required: true,
            regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
          name: {
              required: true,
              maxLength: 15,
              minLength: 2
          },
          content: {
              required: true,
              maxLength: 200,
              minLength: 5
          }
        },
        userValid: {
          email: { valid: false, touched: false, errmessage: '' },
          name: { valid: false, touched: false, errmessage: '' },
          content: { valid: false, touched: false, errmessage: '' },
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
          emailAddress: 'dreamcreamshop@gmail.com',
          body: this.state.user.content,
          subject: 'contact from ' + this.state.user.name +': ' + this.state.user.email
        };

        axios
          .post('email/sendEmail', emailObj)
          .then((res) => {
            this.setState({ sent: true });
            this.setState({loading: false})
          })
          .catch((err) => {
            console.log(err.response);
            this.setState({
              emailNotExistErr: err.response.data.Message,
            });
          });
      }; 

      render() {
        if(this.state.loading){
          return <Spinner />
        }
        if (this.state.sent === true) {
          return (
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
                  <i
                    className='far fa-check-circle fa-4x'
                    style={{ margin: '1.5rem', color: 'var(--green-color)' }}
                  ></i>
                  <h4>.פנייתך התקבלה</h4>
                  <p>.שירות הלקוחות שלנו יחזור אליך בהקדם</p>
                </div>
              </div>
            </div>
          );
        }
        return (
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
                    <Input
                    type='name'
                    name='name'
                    inputtype='input'
                    label='שם'
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    invalid={(!this.state.userValid.name.valid).toString()}
                    touched={this.state.userValid.name.touched.toString()}
                    errmessage={this.state.userValid.name.errmessage}
                  />
                    <Input
                    type='content'
                    name='content'
                    inputtype='textarea'
                    label='פנייתך'
                    value={this.state.content}
                    onChange={this.handleChange('content')}
                    invalid={(!this.state.userValid.content.valid).toString()}
                    touched={this.state.userValid.content.touched.toString()}
                    errmessage={this.state.userValid.content.errmessage}
                    rows="4" cols="50" maxLength="200"
                  />
                  <PinkButton
                    text='שלח'
                    type='submit'
                    disabled={!this.state.isValidForm} />

                </form>
             
        );
      }
}
