import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const MacOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  let productKey = JSON.parse(localStorage.getItem("ProductKey")).productKey;

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await fetch("http://localhost:4040/macaddress/macotp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        otp: otp,
        key:productKey
      }),
    });

    result = await result.json();
    console.log(result);
    if (result.success) {
      toast.success(result.msg, {
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
      toast.error(result.msg, {
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
        <h1>Enter OTP</h1>
        <p>
          We have send an OTP in your registred gmail. It is valid only for 10
          minutes.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="OTP"
            required
            onChange={(e) => setOtp(e.target.value)}
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

export default MacOtp;
