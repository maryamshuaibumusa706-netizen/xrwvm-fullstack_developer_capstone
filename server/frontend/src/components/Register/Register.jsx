import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  }

  const register = async (e) => {
    e.preventDefault();
    let url = `${window.location.origin}/djangoapp/register`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
      }),
    });
    const json = await res.json();
    if (json.status === true) {
      sessionStorage.setItem("username", json.userName);
      navigate("/");
    } else {
      alert("User already exists. Go to login page.");
    }
  };

  return (
    <div className="register_container">
      <div className="header">
        <span className="text">SignUp</span>
        <span className="text">Already have an account?</span>
        <a className="text" onClick={goToLogin}>Login</a>
      </div>
      <hr/>
      <form className="register_panel" onSubmit={register}>
        <div>
          <label className="input_label">User Name</label>
          <input className="input_field" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div>
          <label className="input_label">First Name</label>
          <input className="input_field" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label className="input_label">Last Name</label>
          <input className="input_field" type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label className="input_label">Email</label>
          <input className="input_field" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="input_label">Password</label>
          <input className="input_field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button className="action_button" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;