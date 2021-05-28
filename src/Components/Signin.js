import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import Navbar1 from "./Navbar1";
import "./Signup.css";

export default function Signin(){
    let [mobilePhase, setMobilePhase] = useState(1);
    let [otpPhase, setOtpPhase] = useState(0);
    let [loading,setLoading] = useState(0);
    let mobileRef = useRef();
    let otpRef = useRef();
    let history = useHistory();

    const requestOtp = async(e)=>{
        e.preventDefault();
        setLoading(1);
        let mobile =  mobileRef.current.value;
        if(mobile.length < 10 || mobile.length > 10){
            alert("Please enter valid mobile no.");
            setLoading(0);  
        } 
        else{
            let url="https://backend-survey.herokuapp.com/loginMobile";
            let postData = { 
                mobileNo: mobile
            }
            let response = await fetch(url,{
                method: 'POST',
                mode:'cors',
                headers:{
                 'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            if(response.status === 200){
                  setLoading(0);
                  setMobilePhase(0);
                  localStorage.setItem("mobileNo",mobile)
                  setOtpPhase(1);
            }
            else if(response.status === 404){
                setLoading(0);   
                alert("User in not present.Please Signup first");                 
            }                  
        }   
    }

    const verifyOtp = async(e)=>{
        e.preventDefault();
        setLoading(1);
        let otp = otpRef.current.value;
        if(otp.length !== 4 ){
            setLoading(0);
            alert("Please enter valid otp");
        }      
        else{
            let url = "https://backend-survey.herokuapp.com/verifyLoginOtp";
            let postData = {
                mobileNo: localStorage.getItem("mobileNo"),
                otp: otp
            };
            let response2 = await fetch(url,{
                method:"POST",
                mode:"cors",
                headers:{
                 'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)  
            })
            if(response2.status === 200){
             setLoading(0);
             let respData = await response2.json();
             localStorage.setItem("Authorisation",respData.token);
             localStorage.setItem("Name",respData.name);
             history.push("/dash");  
            }
            else{
                alert("Invalid OTP. Please try again.")              
            }
        }
     }

    return(
        <div>
            <Navbar1/>
            <div className="container">
            
            {
                 mobilePhase===1 &&   
                <div className="mt-5 offset-3 col-6" id="element1">
                   <p className="text-center font1">Signin</p>
                   <div className="offset-2 col-8">
                   <div >
                   <p className="text-center text-muted mt-2" >OTP will be sent to your registered mobile no.</p>
                        <input type="text" ref={mobileRef} className="form-control" placeholder="Enter Mobile No."/>                     
                   </div>
                   <button className="btn btn-primary form-control mt-3" onClick={requestOtp}>Request OTP</button>
                   </div>
                </div>
            }
            
            {
                  otpPhase===1 && 
                  <div className="mt-5 offset-3 col-6" id="element1">
                   <p className="text-center font1">Signin</p>
                   <div className="offset-2 col-8">
                   <div >
                   <p className="text-center text-muted mt-2" >Enter OTP send to your registered mobile no.</p>
                    <input type="text" ref={otpRef} className="form-control" placeholder="Enter OTP"/>                        
                   </div>
                   <button className="btn btn-primary form-control mt-3" onClick={verifyOtp}>Signin</button>
                   </div>
                </div> 
                }
                
                {
             loading ?
             <div className="d-flex justify-content-center mt-3">
               <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
               <span class="sr-only">Loading...</span>  
             </div>
             :null      
           } 

            </div> 
        </div>
    )
}