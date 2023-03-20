import './Header.scss';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/action';
import Images from '../../assets/img/Image';
import Languages from '../Languages/Languages';
import Fade from 'react-reveal/Fade';

function Header() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.userManage.isAuthenticated);
    const account = useSelector((state) => state.userManage.account);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);
        console.log(res);
        if (res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    };

    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
        });
    };
    return (
        <>
            <header className='wrapper-header'>
                <Navbar expand='lg' className='header'>

                    <Fade bottom>
                        <Link to={'/'} className='navbar-brand'>
                            <img src={Images.Headers.logo} alt='' height={30} />
                        </Link>
                    </Fade>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <Fade bottom>
                                <NavLink to={'/user'} className='nav-link'>
                                    USER
                                </NavLink>
                                <NavLink to={'/admin'} className='nav-link'>
                                    ADMIN
                                </NavLink>
                            </Fade>
                        </Nav>
                        <div className='nav-group'>
                            <Fade bottom>
                                <span className='pointer' onClick={() => scrollTo('feature')}>
                                    FEATURES
                                </span>
                                <span className='pointer' onClick={() => scrollTo('aboutus')}>
                                    ABOUT US
                                </span>
                                <span className=' pointer' onClick={() => scrollTo('contact')}>
                                    CONTACT
                                </span>
                                <span className='pointer' onClick={() => scrollTo('')}>
                                    COMPETION
                                </span>
                                <Nav className='settings'>
                                    {isAuthenticated ? (
                                        <NavDropdown title={account.username} >
                                            <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <>
                                            <Button
                                                variant='outline-dark'
                                                className='me-3 btn-login'
                                                onClick={() => handleLogin()}
                                            >
                                                LOG IN
                                            </Button>
                                            <Button variant='dark' className='me-1' onClick={() => handleSignUp()}>
                                                SIGN UP
                                            </Button>
                                        </>
                                    )}
                                    <Languages />
                                </Nav>
                            </Fade>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <Outlet />
        </>
    );
}

export default Header;
