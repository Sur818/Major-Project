import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Otp from "./routes/Otp";
import ProductKey from "./routes/ProductKey";
import Email from "./routes/Email";
import Blank from "./routes/Blank";
import Password_rest from "./routes/Password_rest";
import MacEmail from "./routes/mac/MacEmail";
import MacOtp from "./routes/mac/MacOtp";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/"} element={<Login />} />
        <Route path={"/otp"} element={<Otp />} />
        <Route path={"/productkey"} element={<ProductKey />} />
        <Route path={"/email"} element={<Email />} />
        <Route path={"/blank"} element={<Blank />} />
        <Route path={"/reset-password"} element={<Password_rest />} />
        <Route path={"/macemail"} element={<MacEmail />} />
        <Route path={"/macotp"} element={<MacOtp />} />
      </Routes>
    </Router>
  );
}

export default App;
