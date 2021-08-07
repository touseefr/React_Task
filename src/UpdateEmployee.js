import React, { useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import Token from './Token';

const UpdateEmployee = (props) => {
    const [data, setdata] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const role=localStorage.getItem('role');
    const history = useHistory();
    if(role=== 'employee')
    {
        history.push('/emp')
    }
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push('/login')
        }
    }, [])
   
    useEffect(() => {
        getdata()
    }, []);
    
    
    async function getdata() {
        let result = await fetch('http://127.0.0.1:8000/api/Employeelist/' + props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer 10|dPjpTz8xqUwlUJvnXIoMAunqT3b1a9FLM3QA9UWC'
            }
        })
        result = await result.json();
        setdata(result);
        setname(result.name)
        setemail(result.email)
  //    console.log("result",result);
    }
 async  function updatebtn(id)
    {
         // alert(id);
         let item={name,email}
         if(name==='' || email==='')
         {
             window.alert("Fields cat't be Empty!!!!")
         }
         else{
         let result=await fetch('http://127.0.0.1:8000/api/Employeeupdate/'+id,{
           method:'POST',
           headers:{
               'Content-Type' : 'application/json',
               'Accept' : 'application/json',
               'authorization' : 'Bearer '+ Token()
           },
           body:JSON.stringify(item)
         })
         result=await result.json();
         alert('Employee has been updated successfully...');
         history.push('/');
    }
}
   // console.log("props", props.match.params.id);
   


    return (
        <>
            <Header />
            <h1>UpdateEmployee here</h1>
            <div>
          NAME:  <input Type="text" onChange={(e)=>setname(e.target.value)} defaultValue={data.name} /><br></br>
         EMAIL:  <input Type="text" onChange={(e)=>setemail(e.target.value)}  defaultValue={data.email} /><br></br>
         </div>
            <span onClick={()=>{updatebtn(data.id)}} className="btn btn-primary">Update</span>
           
        </>
    )
}

export default withRouter(UpdateEmployee)