import React,{useState,useEffect} from 'react';
import './Home.css'
import Navbar1 from './Navbar1'

export default function Home(){
    return(
        <div>
           <Navbar1/> 
           <div className="container">
               <p className="text-center" id="head1">Start giving survey inputs using Photo-Survey</p>
               <div className="mt-4 row">
                   <div className="col-md-6 col-lg-6 " >
                       <div className="offset-1 col-9  p-5 " id="component1">
                          <p className="text-center" id="font1">Join The Community</p>
                          <div className="d-flex justify-content-center">
                          <a href="/signup"><button className="btn btn-lg" style={{backgroundColor:"#c3a9e8"}}>Signup</button></a>
                          </div>
                       </div>
                    </div>
                    <div className="col-md-6 col-lg-6 " >
                       <div className="offset-1 col-9  p-5 " id="component1">
                          <p className="text-center" id="font1">Start the survey</p>
                          <div className="d-flex justify-content-center">
                          <a href="/signin"><button className="btn btn-lg " style={{backgroundColor:"#c3a9e8"}}>Signin</button></a>
                          </div>
                       </div>
                    </div>    
               </div>
                <div className="d-flex justify-content-center mt-3">
                 <img src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/top-5-free-survey-makers-760x400.png"/>  
                </div>          
           </div> 

        </div>
    )
}