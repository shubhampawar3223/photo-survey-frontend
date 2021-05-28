import React,{useState,useEffect} from 'react';
import Navbar1 from "./Navbar1";
import "./Dash.css";

export default function History(){
    const [loading,setLoading] = useState(0);
    const [history,setHistory] = useState([]);
    useEffect(async()=>{
        setLoading(1);
        let url="https://backend-survey.herokuapp.com/userHistory/"+ localStorage.getItem("mobileNo");
        let resp =  await fetch(url,{
            method:"GET",
            mode:"cors",
            headers:{
            'Content-Type': 'application/json',
             "Authorisation": localStorage.getItem("Authorisation")   
            }
        })
        if(resp.status === 200){
            let responseData = await resp.json();
            setHistory(()=>[...responseData.data])
            setLoading(0); 
        }
    },[]);

    return(
          <div>

           <Navbar1/>
           <div className="container">  
              {
                loading ?
                    <div className="d-flex justify-content-center mt-3">
                              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                              <span class="sr-only">Loading...</span>  
                    </div>
                    :
                    <>
                    {
                      (history.length !== 0) ?
                      <>
                      <table className="table">
                      <thead className="thead-dark">
                          <tr>
                             <th scope="col">Sr.No</th>
                             <th scope="col">Name</th>
                             <th scope="col-2" >Photo</th>
                             <th scope="col">Date & Time</th> 
                             <th scope="col">Response</th> 
                          </tr>
                      </thead>
                      <tbody>
                      {
                       history.map((e,i)=>{
                        return(
                        <tr key={i}>
                           <th scope="row" > {i+1}</th>
                           <td>{e.name}</td>
                           <td><img src={e.url} style={{height:"18vh",width:"30vw" }}/></td>                           
                           <td>{e.time}</td>
                           {
                             e.status===0 ?     
                            <td>Rejected</td>
                            :                
                            <td>Accepted</td>              
                           }
                        </tr>
                        )
                       }

                       )
                      } 
                      </tbody>
                   </table>
                      </> 
                      :
                      <p className="text-center fontn1">No history yet!!!</p> 
                    } 
                   </>      
           }
           </div>
        </div>
        )
}
