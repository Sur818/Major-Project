import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("email", email)
    let result = await fetch("http://localhost:4040/password/forgot", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      }),
    });

    result = await result.json();
    console.log(result);
    if (result.success) {
      toast.success("OTP Sending...", {
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
        navigate("/Otp");
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
    
  }

  return (
    <div className="box-container">
      <div className="form">
        <h1>Enter Email</h1>
        <p>We'll send an OTP in your registred email</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
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

export default Email;
