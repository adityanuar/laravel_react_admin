import axios from "axios";
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import Menu from "./Menu"
import Nav from "./Nav"

export const Wrapper = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('user');
        } catch (e) {
          setRedirect(true);
        }
      }
    )();
  }, []);
  return (
    redirect ? <Navigate to={'/login'} /> :
      <>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {props.children}
            </main>
          </div>
        </div>
      </>
  )
}
