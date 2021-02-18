import axios from '../axios';

export const sendEmail = (emailAddress, subject, body) => {
  const emailObj = {
    emailAddress: emailAddress,
    subject: subject,
    body: body,
  };
  axios.post('email/sendEmail', emailObj).catch((err) => console.log(err));
};
