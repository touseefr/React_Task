import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const userInfo =JSON.parse (localStorage.getItem('user-info'))
  const role = localStorage.getItem('role')
  
 
     // console.log("role",role);
  //console.log(userInfo.user.role);

  function logout() {
    localStorage.clear();
    window.location= '/login'
  }
  return (

    <>
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Navbar.Brand>
          <Link style={{ color: 'white' }} >Task</Link>
        </Navbar.Brand>

        <Nav className="mr-auto nav_bar_wrapper">
          {
             role ==="admin" ?
              <>
                <Link style={{ color: 'white' }} to="/">Employee List</Link>
                <Link style={{ color: 'white' }} to="/add">Add Employee</Link>
              </> : role === "employee" ? 
                <Link to="/emp">Home page</Link>
                : 
                <Link to="/login">Login</Link>
          }
        </Nav>
        {
          localStorage.getItem('user-info') ?
            <Nav>
              <NavDropdown title={userInfo && userInfo.user.name}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            : null
        }
      </Navbar>

    </>
  )
}

export default Header;