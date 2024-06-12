import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {

    const auth = localStorage.getItem('user');
    const navigate=useNavigate();

    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');
    }


    return (
        <div>
            
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">
                    <img
                            src="https://www.techresearchinfo.com/whitepaper/pro.png"
                            alt="Logo"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                        
                    { auth ?(
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Products</Nav.Link>
                                <Nav.Link as={Link} to="/add">Add Products</Nav.Link>
                                <Nav.Link as={Link} to="/update">Update Products</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            </Nav>
                            <Nav className="ms-auto">
                                <Nav.Link onClick={logout} as={Link} to="/signup">Logout {JSON.parse(auth).name}</Nav.Link>
                            </Nav>
                        </>
                    ) 
                        
                             
                       
                            :
                            <Nav className="ms-auto"> {/* Changed from me-auto to ms-auto */}
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                        }                        
                    
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;