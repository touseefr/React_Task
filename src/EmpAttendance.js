import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Token from './Token';
import { Table } from 'react-bootstrap';
import Header from './Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const EmpAttendace = (props) => {
    //  console.log("ad",props.match.params.id);
    const [data, setdata] = useState([]);//
    const[name,setname]=useState([]);
    const[start,setstart]=useState(null);
    const[end,setend]=useState(new Date());

    useEffect(() => {
        getdata()
    }, [])

    async function getdata() {
        let result = await fetch('http://127.0.0.1:8000/api/Employeelist/' + props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application',
                'authorization': 'Bearer ' + Token()
            },
        })
        result = await result.json();
        setname(result);
        //console.log("re",result);
        setdata(result.attendances);
    }
    console.log("data", data);
    let user_id=name.id;
  //  console.log(user_id);
 // getdata()
  async  function sresult()
    {
        let item={user_id,start,end}
        if(start==='' || end==='')
        {
            window.alert("Fields can't be empty...");   
        }
        else{
        let result=await fetch('http://127.0.0.1:8000/api/date',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Accpet': 'application/json',
                'authorization' : 'Bearer '+ Token()
            },
            body:JSON.stringify(item)
        });
        result= await result.json();
        setdata(result);
       // getdata()
    }
    }

    return (
        <>
            <Header /><br></br>
            <h1>YOUR ATTENDANCE HERE</h1>
            <span style={{ color: 'black' }}>
                    <span style={{ fontWeight: 'bold' }}>  NAME: </span>   <input className="input" style={{ border: 'none' }} type="text" defaultValue={name.name} />
                    <span style={{ fontWeight: 'bold' }}>    Email: </span><input className="input" style={{ border: 'none', }} type="text" defaultValue={name.email} />
                </span><br></br><hr></hr><br></br>
                <span style={{ display: 'inline' }}>
            Start Date<DatePicker dateFormat="yyyy-MM-dd" selected={start}  onChange={date=>setstart(date)} />
               End Date <DatePicker dateFormat="yyyy-MM-dd"  selected={end} dateFromat='YYYY-MM-dd' onChange={date=>setend(date)} />
                <button onClick={sresult} style={{ marginLeft: 23 }}>Search</button>
            </span><br></br>
            <div className="col-sm-8 offset-sm-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Date</th>
                            <th>CheckIn</th>
                            <th>CheckOut</th>
                        </tr>
                    </thead>
                    <tbody>
                     {
                         data.map((item)=>
                         <tr>
                            {/* <td>{item.id}</td> */}
                            <td>{item.date}</td>
                            <td>{item.checkin}</td>
                            <td>{item.checkout}</td>
                         </tr>
                         )
                     }
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default withRouter(EmpAttendace);