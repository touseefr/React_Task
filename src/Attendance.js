import React, { useState, useEffect } from 'react';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Token from './Token';

const Attendance = (props) => {
    const [data, setdata] = useState([]);
    const [attendance, setattendance] = useState([]);
    const [q, setq] = useState("");
    const [start, setstart] = useState("");
    const [end, setend] = useState("");
    useEffect(() => {
        getdata()
    }, []);
    async function getdata() {
        let result = await fetch('http://127.0.0.1:8000/api/Employeelist/' + props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + Token()
            }
        })
        result = await result.json();
        setdata(result);
        // console.log("data",data);
        // console.log("result",result.attendances);
        //   console.log("result", result.attendances);
        setattendance(result.attendances);
        //   console.log("result",result.id);
    }
    // console.log("data",data.id);
    //  userid={"idd":data.id}
    let user_id = data.id;
    async function sresult() {
        //   console.log("click");
        let item = { user_id, start, end }
        // console.log("item",item)
        let result = await fetch('http://127.0.0.1:8000/api/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + Token()
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        console.log('result', result);
        setattendance(result);
    }
    // console.log("id",props.match.params.id);
    return (
        <>
            <Header />
            <h1>Employee Imformation Here...</h1><br></br>
            <section className="">
                <span style={{ color: 'black' }}>
                    <span style={{ fontWeight: 'bold' }}>  ID: </span>   <input className="input" style={{ border: 'none' }} type="text" defaultValue={data.id} />
                    <span style={{ fontWeight: 'bold' }}>    NAME: </span><input className="input" style={{ border: 'none', }} type="text" defaultValue={data.name} />
                </span><br></br>
                <span style={{ color: 'black' }}>
                    <span style={{ fontWeight: 'bold' }}>  Email: </span>   <input className="input" style={{ border: 'none' }} type="text" defaultValue={data.email} />
                    <span style={{ fontWeight: 'bold' }}>    ROLE: </span><input className="input" style={{ border: 'none', }} type="text" defaultValue={data.role} />
                </span>
            </section><hr></hr>
            <h1>Attendance</h1>
            <span style={{ display: 'inline' }}>
                Start Date <input type="text" onChange={(e) => { setstart(e.target.value) }} placeholder="Start Date" />
            End Date  <input type="text" onChange={(e) => { setend(e.target.value) }} placeholder="End Date" />
                <button onClick={sresult} style={{ marginLeft: 23 }}>Search</button>

            </span>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendance.map((item) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.checkin}</td>
                                <td>{item.checkout}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

        </>
    )
}

export default withRouter(Attendance)