import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Loading.css";
import "../styles/Mymodal.css";

const Blank = () => {
  const [match, setMatch] = useState(false);
  const navigate = useNavigate();
  let productKey = JSON.parse(localStorage.getItem("ProductKey")).productKey;

  async function verify() {
    console.log("effect called... ");
    let result = await fetch("http://localhost:4040/macaddress", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: productKey,
      }),
    });

    result = await result.json();
    if (result.success) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      setTimeout(() => {
        setMatch(true);
      }, 3000);
    }
  }
  useEffect(() => {
    verify();
  }, []);

  function handleNo() {
    localStorage.clear();
    navigate("/");
  }

  function handleYes() {
    navigate("/macemail");
  }

  console.log("component calling...");

  return (
    <div id="main">
      {match ? (
        <div className="myModal">
          <h1>Warning...</h1>
          <p>
            This software is currently running in another device. Do you want to
            log out from other device?
          </p>
          <div className="buttonContainer">
            <button className="Nobutton" onClick={handleNo}>
              No
            </button>
            <button className="Yesbutton" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>System Checking...</h1>
          <div className="animation">
            <div id="s1"></div>
            <div id="s2"></div>
            <div id="s3"></div>
            <div id="s4"></div>
            <div id="s5"></div>
            <div id="s6"></div>
            <div id="s7"></div>
            <div id="s8"></div>
            <div id="s9"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blank;
