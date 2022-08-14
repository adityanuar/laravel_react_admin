import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";

export const Nav = () => {
  const [user, setUser] = useState(new User());
  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get('user');
        if (data) setUser(new User(data.id, data.first_name, data.last_name, data.email, data.role));
      }
    )();
  }, []);

  const logout = async () => {
    await axios.post('logout', {});
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a href="#" className="navbar-brand col-md-3 col-lg-2 me-8 px-3">Company name</a>
      <ul className="my-2 my-md-8 me-md-3">
        <Link to={'/profile'} className="p-2 text-white text-decoration-none">{user.name}</Link>
        <Link to={'/login'} className="p-2 text-white" onClick={logout}>Sign out</Link>
      </ul>
    </nav>
  )
}

export default Nav;
