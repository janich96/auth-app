import React, { useRef, useState } from 'react';
import './App.css';

function App() {

  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const emailRef = useRef();

  function fetchAuth(credentials) {
    return (
      fetch(('http://localgost:3000'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then((data) => data)
        .catch((error) => console.log('Request failed', error))
    )
  }

  function validateForm() {
    const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (userEmail.match(emailRegExp)) {
      emailRef.current.style.border = '2px solid green';
    } else {
      emailRef.current.style.border = '2px solid red';
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateForm();
    return fetchAuth({userEmail, password});
  }

  return (
    <div className='app-wrapper'>
      <h1 className='title'>Log in</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          type='text' 
          name='email' 
          id='email'
          ref={emailRef} 
          onChange={e => setUserEmail(e.target.value)}
          placeholder='email'
        ></input>
        <input 
          type='password' 
          name='password' 
          id='password' 
          onChange={e => setPassword(e.target.value)}
          placeholder='password'
        ></input>
        <button type='submit'>&#5171;</button>
      </form>
    </div>
  )
}

export default App;
