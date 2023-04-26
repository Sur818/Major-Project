import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductKey = () => {
  const [productkey, setProductkey] = useState("");
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user"))._id;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(productkey);
    let result = await fetch("http://localhost:4040/productkey", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        productKey: productkey,
      }),
    });

    result = await result.json();
    if (result.Key) {
      localStorage.setItem("ProductKey", JSON.stringify(result.Key));
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
        navigate("/blank");
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
      // console.log(result.msg);
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
      // console.log(result.error);
    }
  }

  return (
    <div className="box-container">
      <div className="form">
        <h1>Unlock the Product</h1>
        <p>Please enter the Product key that we have assigned to you.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="product key"
            required
            onChange={(e) => setProductkey(e.target.value)}
          />
          <button>Submit</button>
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

export default ProductKey;
