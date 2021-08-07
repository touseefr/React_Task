import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from './Header';

const Login=()=>{
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
     const role=""
    const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push('/add');
        }
    },[]);

  async  function login()
    {
       // console.log("data",email,password);
        let item={email,password}
        if (email === '' || password === '')
        {
            window.alert("Fields Can't be Empty...")
        }
        let result=await fetch('http://127.0.0.1:8000/api/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result=await result.json();
        if( result.status_code === 200){
            localStorage.setItem("user-info",JSON.stringify(result));
            localStorage.setItem('role',result.user.role);
            if(result.user.role === 'admin'){
                    // history.push('/');
                    window.location = "/"
                    }
                    else{
                        window.location = "/emp"
                    }
        }else{
            window.alert("invalid Email or Password")
        }
      
    }

    return(
        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
        <h1>login here</h1>
        {/* <form> */}
        <input type="text"  className="form-control" required placeholder="enter email" 
        onChange={(e)=>setemail(e.target.value)}/><br></br>

        <input type="password" required className="form-control" placeholder="enter password" 
        onChange={(e)=>setpassword(e.target.value)}/><br></br>

        <button className="btn btn-primary" onClick={login}>Login</button>
        {/* </form> */}
        </div>
        </>
    )
}

export default Login;