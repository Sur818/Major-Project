import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from "react-router-dom";


const Password_rest = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  async function handleSubmit(e) {
    if (password === cpassword) {
      e.preventDefault();
      localStorage.setItem("email", email);
      let result = await fetch("http://localhost:4040/password/reset-password", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      result = await result.json();
      console.log(result);
      if (result.success) {
        toast.success("Password updating...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (result.success === false) {
        toast.warn(result.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(result.msg);
      } else {
        toast.error(result.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(result.error);
      }
    } else {
      alert("Passwords do not match");
    }
  }
  return (
    <div className="box-container">
      <div className="form">
        <h1>Create New Password</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Password_rest;
