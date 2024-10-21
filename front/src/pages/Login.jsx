import React from 'react'
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utils/API_Routes'

function Login() {

  const navigate= useNavigate();
 
  const [values,set_values]= useState(
    {
      username:"",
      password:"",
     
    }
  )
  //commented this as not needed for resume puprose project
  // add this in main act as A , act as B page

//   useEffect(()=>{
//     if(localStorage.getItem("chatX-user"+data.user.username))
//     {
// navigate("/chat", { state: {username: data.user.username } });
//     }
//   },[]);
  // as the dependency array is empty, so effect function will run only at first render of the component

  
const toast_option= {
  position:"top-right",
  autoClose:5000,
  pauseOnHover:true,
  theme:"dark",
}

const handleValidation=()=>{

  console.log(" login validation func being called");

const {username,password}= values;

if(username==="" || username.length<1)
{
  toast.error("enter valid username : 3 or more characters",toast_option);
  console.log("inside login username");
  return false;

}

else if(password==="")
{
  toast.error("password should be atleast 2 character",toast_option);
  console.log("inside login password");
  return false;

}





else{
  console.log("success login validation");
  return true;
}
  
}

 

  // handling submit

const handleSubmit= async (event)=>{
  //prevent default behavior of submit form
  event.preventDefault();

  if(handleValidation()===true)
  {
    console.log("inside login validation",loginRoute);
    const {username,password}= values;
    
    
    //sending login data to an api endpoint
      const {data} = await axios.post(loginRoute,
        {username,password});

        console.log("showing login data from res==>",data);
  
        if(data.status===false){
          toast.error(data.msg,toast_option);

        }
        if(data.status===true)
        {
          toast.success("Login Successfull",toast_option);

          console.log("login success and user present in mongo");

          //storing creted_user json object received from response as string in BROWSER LOCAL storage
          localStorage.setItem("chatX-user"+data.user.username,JSON.stringify(data));

          window.parent.postMessage({ user: "chatX-user"+data.user.username, action: "login" }, "*");
          window.parent.postMessage({ user: "chatX-user"+data.user.username, action: "login" }, "*");
//navigating page to route "" using useNavigate
navigate("/chat", { state: {username: data.user.username } });
        }

        
    

  }
  
}

//sensing changes


const handleChange=(event)=>{
  set_values({...values,[event.target.name]:event.target.value})
  
}



  return (
    <>
    <FormContainer >

    

       <form onSubmit={(event)=>{
        handleSubmit(event)
       }}>

      <div className="brand">
        <img src="" alt="" />
        <h1>ChatX</h1>
      </div>

      <input type="text"
      placeholder='username'
      name='username'
      onChange={(e)=>{
        handleChange(e);
      }} />

    

      <input type="password"
      placeholder='password'
      name='password'
      onChange={(e)=>{
        handleChange(e);
      }} />

      

<button id='btn' type='submit'>
  Login
</button>

<span>New Here ? <Link to="/register" >  Register </Link></span>

       </form>

    </FormContainer>
    <ToastContainer/>
    </>
  );




}
const FormContainer= styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#25282a;
gap:1rem;

.brand{
  display:flex;
  justify-content:center;
align-items: center;
gap: 0.5rem;



}

form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color:#090c0e;
  padding: 1rem 5rem ;
  border-radius: 2rem;
  height: auto;
  max-width: 85%;
  




}
input{
  padding: 10px;
  /* width: 100%; */
  border: 3px solid black;
  font-size: 1rem;
  border-radius: 1rem;
  font-style: italic;
  
  &:focus{
    border:  0.3rem solid  #5ccb41;
  }
  text-align: center;
  
}

::-webkit-input-placeholder {
        text-align: center;
      }
:-moz-placeholder {
        text-align: center;
      }


h1{
  text-align: center;
  font-size: 3rem;
  color:white;
  padding: 1rem 3rem;
  margin: 1rem;
  //added
  
  /* animation: pulsate 2.5s infinite alternate;   */

  
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;

  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #bc13fe,
            0 0 0.8rem #bc13fe,
            0 0 2.8rem #bc13fe,
            inset 0 0 1.3rem #bc13fe; 
 
}

//added

/* h1 {
  color: #ffeded;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #bc13fe,
    0 0 82px #bc13fe,
    0 0 92px #bc13fe,
    0 0 102px #bc13fe,
    0 0 151px #bc13fe;
} */

/* @keyframes pulsate {
    
    100% {
  
        text-shadow:
        0 0 4px #fff,
        0 0 11px #fff,
        0 0 19px #fff,
        0 0 40px #bc13fe,
        0 0 80px #bc13fe,
        0 0 90px #bc13fe,
        0 0 100px #bc13fe,
        0 0 150px #bc13fe;
    
    }
    
    0% {
  
      text-shadow:
      0 0 2px #fff,
      0 0 4px #fff,
      0 0 6px #fff,
      0 0 10px #bc13fe,
      0 0 45px #bc13fe,
      0 0 55px #bc13fe,
      0 0 70px #bc13fe,
      0 0 80px #bc13fe;
  
  }
} */


button{
  padding: 1rem;
  background-color: black;
  color: white;
  font-size: 1rem;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  /* transition: 0.3s ease-in-out; */
  &:hover{
    background-color: #5ccb41;
  }
  &:active {
    background-color: #ffbf00;
}
  

}



span{
  color: white;
  
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size:1rem;
  text-align: center;
  justify-content: center;
  

  a{
    text-decoration: none;
    background-color: #9e19198c;
    padding: 0.5rem;
    color: white;
    border-radius: 0.5rem;

    transition: 0.2s ease-in-out;
  &:hover{
    background-color: #5ccb41;
  }

  }
}



`;





export default Login;