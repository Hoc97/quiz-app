import { Link, NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss';
import { Button } from 'react-bootstrap';
import logoBg from '../../assets/img/logo-react.svg';
import { useSelector } from 'react-redux';

function Header() {
    const account = useSelector((state) => state.userManage.account);
    const isAuthenticated = useSelector((state) => state.userManage.isAuthenticated);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/signup');
    };
    return (
        <header className='wrapper-header'>
            <Navbar expand='lg'>
                <Container>
                    <Link to={'/'} className='navbar-brand'>
                        <img src={logoBg} alt='' height={30} />
                        <span>HỌC ĐI CODE DẠO</span>
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
                            {isAuthenticated ? (
                                <NavDropdown title='Settings' id='basic-nav-dropdown'>
                                    <NavDropdown.Item>Log out</NavDropdown.Item>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Button
                                        variant='outline-dark'
                                        className='me-3 btn-login'
                                        onClick={() => handleLogin()}
                                    >
                                        Log in
                                    </Button>
                                    <Button variant='dark' className='me-1' onClick={() => handleSignUp()}>
                                        Sign up
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
