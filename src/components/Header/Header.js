import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss';
import { Button } from 'react-bootstrap';

function Header() {
    return (
        <header className='wrapper-header'>
            <Navbar expand='lg'>
                <Container>
                    <Link to={'/'} className='navbar-brand'>
                        Học Làm Dev
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <NavLink to={'/'} className='nav-link'>
                                Home
                            </NavLink>
                            <NavLink to={'/user'} className='nav-link'>
                                User
                            </NavLink>
                            <NavLink to={'/admin'} className='nav-link'>
                                Admin
                            </NavLink>
                        </Nav>
                        <Nav>
                            <Button variant='outline-dark' className='me-3 btn-login'>
                                Log in
                            </Button>
                            <Button variant='dark' className='me-1'>
                                Sign up
                            </Button>
                            {/* <NavDropdown title='Settings' id='basic-nav-dropdown'>
                                <NavDropdown.Item>Log in</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item>Log out</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
