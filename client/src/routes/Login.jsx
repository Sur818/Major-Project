import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await fetch("http://localhost:4040/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    result = await result.json();
    console.log(result);
    if (result._id) {
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login...!", {
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
        navigate("/productkey");
      }, 3000);
    } else if (result.msg) {
      toast.warn(result.msg, {
        position: "top-right",
        autoClose: 5000,
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
        autoClose: 5000,
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
        <h1>Software Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>login</button>
          <p>
            Forgot Password?{" "}
            <Link to={"/email"} target="_blank">
              reset
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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

export default Login;
