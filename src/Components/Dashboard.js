import React,{useState,useEffect,useRef} from 'react';
import Navbar1 from './Navbar1'
import "./Dash.css";

export default function Dashboard(){
    let [count,setCount] = useState([1,2,3,4,5]);
    let [images,setImages] = useState([
      "http://getdrawings.com/free-icon-bw/one-icon-3.png",
      "http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png",
      "http://getdrawings.com/free-icon-bw/serial-number-icon-19.png",
      "http://getdrawings.com/free-icon-bw/serial-number-icon-18.png", 
      "http://getdrawings.com/free-icon-bw/number-one-icon-17.png"
    ]);
    let [current,setCurrent] = useState(0);
    let [reject,setReject] = useState(null);
    let [accept,setAccept] = useState(null);
    let [final,setFinal] = useState(0);
    let [name,setName] = useState(localStorage.getItem("Name"));
    let [imageNames,setInames] = useState(["One","Two","Three","Four","Five"]) 
    let [record,setRecord] = useState([]);
    let [resp,setResp] = useState(0);
    let [loading,setLoading] = useState(0);
    let [rejectElement,setRejectElement] = useState(null);     
    let [acceptElement,setAcceptElement] = useState(null);
    const rejectMsg = useRef();
    const acceptMsg = useRef();
    const savedRef = useRef();
    const btnRef = useRef();
    const bt1 = useRef();
    const bt2 = useRef();
    
    useEffect(()=>{
      window.confirm(localStorage.getItem("Name") +" Welcome!!! Lets start the survey. Use like and dislike button to give your")
    },[])

    useEffect(()=>{
       let timer = 
        setInterval(()=>{
            if(current < images.length-1){
               setCurrent(current+1);
            }   
            else{
                clearInterval(timer);
                setFinal(1); 
            }   
  
        },5000);  
    },[current])
    
    const save= async(e)=>{
      e.preventDefault();
      setLoading(1);
      let url = "https://backend-survey.herokuapp.com/postSwipingHistory";
      let postData = {
          mobileNo: localStorage.getItem("mobileNo"),
          history:record
      };
      let resp = await fetch(url,{
         method:"POST",
         mode:"cors",
         headers:{
            'Content-Type': 'application/json',
            'Authorisation': localStorage.getItem("Authorisation")
         }, 
         body:JSON.stringify(postData)
      })
      if(resp.status === 200){
        setLoading(0);  
        savedRef.current.style.display="block";            
        btnRef.current.style.display = "none";
      }
    }

    let swipeLeft =(e)=>{
      e.preventDefault();
      let currTime = new Date().toLocaleString();
      setReject(1);
      setRejectElement(current);
      rejectMsg.current.style.display = "block"
      acceptMsg.current.style.display = "none"
      setAccept(0);        
    setRecord((e)=>[...e,{name:imageNames[current], time:currTime, url:images[current], status:0}])       
    }

    let swipeRight =(e)=>{
      e.preventDefault();
      let currTime = new Date().toLocaleString();
    
      setAccept(current);
      setAcceptElement(current);
      rejectMsg.current.style.display = "none"
      acceptMsg.current.style.display = "block"
      setReject(null);
      setRecord((e)=>[...e,{name:imageNames[current], time:currTime, url:images[current], status:1}])
      }

      return(
        <div>
           <Navbar1/>
           {
           final ===0 ?  
           <div className="container">               
               <p ref={rejectMsg} className="mt-3 text-center text-danger notify" style={{display:"none"}}>{name} you have rejected image {imageNames[rejectElement]}</p>   
               <p ref={acceptMsg} className="mt-3 text-center text-success notify" style={{display:"none"}}>{name} you have accepted image {imageNames[acceptElement]}</p>

               <div className=" d-flex offset-3 col-6" style={{marginTop:"5%"}}>
               <button ref={bt1} className="btn btn-white" onClick={swipeLeft}><i class="fa fa-thumbs-down fa-3x" aria-hidden="true"></i></button>                 
               
               <img src={images[current]} className="img" width="350" />        
               <button ref={bt2}  className="btn btn-white" onClick={swipeRight}><i class="fa fa-thumbs-up fa-3x" aria-hidden="true"></i></button>  
               </div>
               <p className="text-center mt-3" style={{fontSize:"1.5rem"}}>{imageNames[current]}.png</p>               
           </div> 
           :
           <>
           <p className="text-center fontn1">{name} you have rated all the images.Thank You!</p>
           <div className="d-flex justify-content-center mt-3">
            {
            record.length > 0 &&   
            <>
           <button ref={btnRef} className="btn btn-primary btn-lg" onClick={save}>Save Response</button>
           <p ref={savedRef} className="text-center text-success" style={{display:"none"}}>Saved Successfully.</p>  
           </>
           }
           {
                loading ?
                    <div className="d-flex justify-content-center mt-3">
                              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                              <span class="sr-only">Loading...</span>  
                    </div>
                :
                null     
        }
                          
           
           </div>
           </> 
            }   
        </div>
    )
}
