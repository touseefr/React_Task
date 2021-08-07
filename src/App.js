import './App.css';
import Login from './Login';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import ListEmployee from './ListEmployee';
import Attendance from './Attendance';
import Emp from './Emp';
import EmpAttendace from './EmpAttendance';

function App(props) {
  let userinfo = JSON.parse(localStorage.getItem('user-info'));
  let role = localStorage.getItem('role');
  console.log(role)
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        {role === 'admin' ?
          <>
            <Route exact path="/">
              <ListEmployee />
            </Route>
           
            <Route path="/update/:id">
              <UpdateEmployee />
            </Route>
            <Route exact path="/add">
              <AddEmployee />
            </Route>
            <Route path="/attendance/:id">
              <Attendance />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </> : role === 'employee' ?
            <>
              <Route path="/emp">
                <Emp />
              </Route>
              <Route render={() => <Redirect to="/emp" />} />
              <Route path="/empattendance/:id">
                <EmpAttendace />
              </Route>

            </> :
            <>
           
                <Route path="/login">
                  <Login />
                </Route>
                <Route render={() => <Redirect to="/login" />} />
            </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
