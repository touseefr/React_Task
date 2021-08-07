import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Token from './Token';
//import Attendance from './Attendance';

const ListEmployee = () => {

  const [data, setdata] = React.useState([]);
  const [q, setq] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push('/login');
    }
  }, []);
  useEffect(() => {
    getData()
  }, []);
  const getData = async () => {
    let result = await fetch('http://127.0.0.1:8000/api/Employeelist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + Token()
      }
    });
    result = await result.json();
    setdata(result);
  }
  async function deleteOperaion(id) {
    //alert(id);
    let result = await fetch('http://127.0.0.1:8000/api/Employeedelete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + Token()
      }
    })
    result = await result.json();
    alert('Employee Record has been deleted...')
    getData()
    // console.log(result);
  }


  // console.log("data", data);
  return (
    <>
      <Header /><br></br>
      <h1>ListEmployee here</h1>
      <div className="col-sm-8 offset-sm-2">
        <div>
          <input type="text" placeholder="Search by Name" className="form-control"
          style={{marginTop:50 ,marginBottom:20, width:'40%'}} onChange={(e) => setq(e.target.value)} />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              data.filter((val)=>{
                if(q === ""){
                  return val;
                }else{
                 return val.name.toLowerCase().includes(q.toLowerCase());
                 
                }
                
              }).map((item) =>
              (<tr key={item.id}>
                <td>{item.id}</td>
                <Link to={"/attendance/" + item.id}> <td style={{ border: 'none' }}>{item.name}</td></Link>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td><span onClick={() => { deleteOperaion(item.id) }} className="btn btn-danger">Delete</span>
                  <Link to={"/update/" + item.id}><span className="btn btn-info" style={{ marginLeft: 12 }}>Update</span></Link>
                </td>
              </tr>
              ))
              }

          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ListEmployee;