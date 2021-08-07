import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Token from './Token';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';



const Emp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    let userinfo = JSON.parse(localStorage.getItem('user-info'));
    //console.log("user",userinfo.user.id);
    
    
    //   if (!localStorage.getItem("user-info")) {
    //     return  history.push('/login');
    //    }
   const user_id = userinfo.user.id;
   async function newcheck()
    {
        let date=new Date().toLocaleDateString('en-CA');
    let checkin=new Date().toLocaleTimeString();
      //  let user_id = userinfo.user.id;
        let item = { user_id, date , checkin   }
            let result = await fetch('http://127.0.0.1:8000/api/addcheckin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': 'Bearer ' + Token() 
                },
                body: JSON.stringify(item)
            })
            result = await result.json(); 
            alert('Your Checkin has been added Successfully...')
            history.push('/emp');
    }
  
    async function newcheckout(){
        let date=new Date().toLocaleDateString('en-CA');
    let checkout=new Date().toLocaleTimeString();
      //  console.log(" user_id, date, checkin ", user_id, date, checkoutt );
    //  let user_id = userinfo.user.id;
        let item={user_id,date,checkout}
        let result=await fetch('http://127.0.0.1:8000/api/addcheckout',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization' : 'Bearer '+ Token()
            },
            body:JSON.stringify(item)
        })
        result=await result.json();
        alert("Your ChechOut has been added successfully...");
        history.push('/emp');
    }
    return (
        <>

            <Header /><br></br>
            <h1>Employee Attendance Page...</h1><hr></hr>
            <div  className="col-sm-4 offset-sm-4" style={{background: 'aquamarine'}} >
            <button style={{background:'#ffda97'}} onClick={newcheck}>Checkin</button><br></br><br></br>
            <button onClick={newcheckout}>CheckOut</button><br></br><br></br>
             <strong>Check Your Attendance </strong><br></br>
           <Link to={"/empattendance/"+ user_id}> <a style={{cursor:'pointer', color:'red'}}>Click Here</a></Link> 
            </div>

        </>
    )
}

export default Emp;