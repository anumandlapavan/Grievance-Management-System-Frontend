import './App.css';
import {Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup';
import AccountPage from './pages/AccountPage';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/updatepassword/:token" element={<UpdatePassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
