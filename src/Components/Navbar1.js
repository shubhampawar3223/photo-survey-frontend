import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Home.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

export default function Navbar1(){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const logout = async(e)=>{
     e.preventDefault();
     let mobile=localStorage.getItem("mobileNo");
     localStorage.removeItem("mobileNo");
     localStorage.removeItem("Name");
     localStorage.removeItem("Authorisation");     
     history.push("/");
     let url = "https://backend-survey.herokuapp.com/logout/"+mobile;
     await fetch(url,{
         method:"PUT",
         mode:"cors",
         headers:{
            'Content-Type': 'application/json'
           }         
     })
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" id="heading"  style={{marginLeft:"1%"}}>Photo-Survey</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          {
          localStorage.getItem('Authorisation')!== null?
          <>    
            <NavItem>
              <NavLink href="/dash" className="nav1 ">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/history" className="nav1">History</NavLink>
            </NavItem>
          </>  
            :
            null
          } 
          </Nav>
          
        </Collapse>
        {
          localStorage.getItem('Authorisation')=== null?  
        <>
        <NavLink href="/signin" className="text-dark"><button className="btn btn btn-light " style={{marginRight:"1%"}}>Signin</button></NavLink> 
        <NavLink href="/signup" className="text-dark"><button className="btn btn btn-light " style={{marginRight:"1%"}}>Signup</button></NavLink>
        </>
        :
        <NavLink className="text-dark"><button className="btn btn btn-light " style={{marginRight:"1%"}} onClick={logout}>Logout</button></NavLink>
        }        
      </Navbar>
    </div>
  )
}