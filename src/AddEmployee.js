
import Header from './Header';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const AddEmployee = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
   const role=localStorage.getItem('role');
  const history = useHistory();
  if(role=== 'employee')
  {
       history.push('/emp');
  }
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push('/login');
    }
  }, []);
 
 // else if()
  async function add() {
    // console.log("data",name,email,password);
    let item = { name, email, password }
    if(name=== "" || email==="" || password==='')
    {
      window.alert("Fields can't be emplty!!!!")
    }
    else{
    let result = await fetch('http://127.0.0.1:8000/api/Employeecreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer 10|dPjpTz8xqUwlUJvnXIoMAunqT3b1a9FLM3QA9UWC'
      },
      body:JSON.stringify(item)
    });
    result = await result.json();
    history.push('/');
    window.alert("Employee Has been Created Successfully");
  }
}
  return (
    <>
      <Header />
      <h1>Add Employee here</h1><br></br>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" className="form-control"
          onChange={(e) => setname(e.target.value)} placeholder="Enter Name" required/><br></br>

        <input type="text" className="form-control"
          onChange={(e) => setemail(e.target.value)} placeholder="Enter Email" /><br></br>

        <input type="text" className="form-control"
          onChange={(e) => setpassword(e.target.value)} placeholder="Enter Passwords" /><br></br>
        <button onClick={add} className="btn btn-success">Add Employee</button>
      </div>
    </>
  )
}

export default AddEmployee;