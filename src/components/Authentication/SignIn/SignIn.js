import React from 'react';

export default function SignIn() {
  return (
    <div>
      <labele>שם פרטי:</labele>
      <input type='text' />
      <br />

      <labele>שם משפחה:</labele>
      <input type='text' />
      <br />

      <labele> טלפון:</labele>
      <input type='text' />

      <br />

      <labele>כתובת:</labele>
      <input type='text' />
      <br />

      <labele>מייל:</labele>
      <input type='email' />
      <br />
      <labele>סיסמא:</labele>
      <input type='password' />
      <br />
      <br />
      <br />
      <br />
      <button>הירשם</button>
    </div>
  );
}
