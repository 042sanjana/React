import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const SetPin=()=>{
    const nav=useNavigate();
    const [pin, setPin] = useState("");

    const handlePin=()=>{
    if(pin.length!==6){
    alert("PIN must be 6 digits");
    return;
    }
    localStorage.setItem("pin", pin);
    nav("/dashboard");
    };
    return(
    <div className="auth-container">
    <h2>Set Secret PIN</h2>
    <input type="password" maxLength="6" placeholder="Enter 6-digit PIN" value={pin} onChange={(e)=>setPin(e.target.value)}  />
    <button onClick={handlePin}>Save PIN</button>
    </div>
    );
    };
export default SetPin;