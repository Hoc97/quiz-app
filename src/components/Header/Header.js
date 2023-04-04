import './Header.scss';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/apiService';
import { toast } from 'react-toastify';
import Images from '../../assets/img/Image';
import Fade from 'react-reveal/Fade';
import Clock from '../TimeDate/Clock';
import ClockDate from '../TimeDate/ClockDate';

function Header() {
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const account = useSelector((state) => state.accountManage.account);
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
            dispatch({ type: 'USER_LOGOUT' });
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
                        <Nav >
                            <Fade bottom>
                                <NavLink to={'/user'}
                                    onClick={() => localStorage.setItem('scrollpos', 0)}
                                    className='nav-link'>
                                    USER
                                </NavLink>
                                <NavLink to={'/admin'} className='nav-link'>
                                    ADMIN
                                </NavLink>
                            </Fade>
                        </Nav>
                        <Clock />
                        <ClockDate />
                        <div className='nav-group'>
                            <Fade bottom>
                                {pathname === "/" &&
                                    <>
                                        <span className='pointer intro' onClick={() => scrollTo('feature')}>
                                            TÍNH NĂNG
                                        </span>
                                        <span className='pointer intro' onClick={() => scrollTo('aboutus')}>
                                            VỀ CHÚNG TÔI
                                        </span>
                                        <span className=' pointer intro' onClick={() => scrollTo('contact')}>
                                            LIÊN HỆ
                                        </span>
                                        <span className='pointer intro' onClick={() => scrollTo('')}>
                                            THI ĐẤU
                                        </span>
                                    </>
                                }
                            </Fade>
                            <Fade bottom>
                                <Nav className='settings'>
                                    {isAuthenticated ? (
                                        <NavDropdown
                                            title={
                                                <span className='username-avatar'>
                                                    <img
                                                        src={`data:image/jpeg;base64,${account.image}`}
                                                        className='avatar'
                                                        alt=''
                                                    />
                                                    <span>{account.username}</span>
                                                </span>
                                            }
                                        >
                                            <NavDropdown.Item onClick={() => navigate('/profile')}>
                                                Tài khoản
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <>
                                            <Button
                                                variant='outline-dark'
                                                className='me-3 btn-login'
                                                onClick={() => handleLogin()}
                                            >
                                                ĐĂNG NHẬP
                                            </Button>
                                            <Button variant='dark' className='me-1' onClick={() => handleSignUp()}>
                                                ĐĂNG KÝ
                                            </Button>
                                        </>
                                    )}
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
