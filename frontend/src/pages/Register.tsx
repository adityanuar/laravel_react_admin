import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import '../Login.css';
import { Navigate } from 'react-router-dom';

export const Register = () => {
  let first_name: string = '';
  let last_name: string = '';
  let email: string = '';
  let password: string = '';
  let password_confirm: string = '';

  let [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post('register', {
      first_name,
      last_name,
      email,
      password,
      password_confirm
    });
    if (response.status === 200) setRedirect(true);
    console.log(response.data);
  }
  return (
    redirect ? <Navigate to={'/login'} /> :
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <input type="text" className="form-control" placeholder="first name" onChange={e => first_name = e.target.value} />
          <input type="text" className="form-control" placeholder="last name" onChange={e => last_name = e.target.value} />
          <input type="email" className="form-control" placeholder="name@example.com" onChange={e => email = e.target.value} />
          <input type="password" className="form-control" placeholder="Password" onChange={e => password = e.target.value} />
          <input type="password" className="form-control" placeholder="Password Confirm" onChange={e => password_confirm = e.target.value} />
          <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
        </form>
      </main>

  )
}
