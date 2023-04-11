import './Header.scss';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Headers } from '../../assets/img/Image';
import Fade from 'react-reveal/Fade';
import Clock from '../TimeDate/Clock';
import ClockDate from '../TimeDate/ClockDate';
import Notification from './Notification';
import { handleLogin, handleLogout } from '../common/handleCommon';



function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const account = useSelector((state) => state.accountManage.account);
    const role = useSelector(state => state.accountManage.account.role);


    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <>

            <header className='wrapper-header' style={{ backgroundColor: pathname === "/" ? 'white' : 'bisque' }}>
                <Navbar expand='lg' className='header'>
                    <Fade bottom>
                        <Link to={'/'} className='navbar-brand'>
                            <img src={Headers.logo} alt='' height={30} />
                        </Link>
                    </Fade>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav >
                            <Fade bottom>
                                <NavLink to={'/user'}
                                    onClick={() => localStorage.setItem('scrollpos', 0)}
                                    className='nav-link'>
                                    GÓC HỌC TẬP
                                </NavLink>
                            </Fade>
                            <Fade bottom>
                                {role === 'ADMIN' &&
                                    <NavLink to={'/admin'} className='nav-link'>
                                        ADMIN
                                    </NavLink>
                                }
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
                                        {role === 'USER' &&
                                            <span className='pointer intro' >
                                                THI ĐẤU
                                            </span>
                                        }
                                    </>
                                }
                            </Fade>
                            {pathname === "/user" && <Notification account={account} />}
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
                                            }>
                                            <NavDropdown.Item onClick={() => navigate('/profile')}>
                                                Tài khoản
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleLogout(account, dispatch, navigate)}>Đăng xuất</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <>
                                            <Button
                                                variant='outline-dark'
                                                className='me-3 btn-login'
                                                onClick={() => handleLogin('/login', navigate)}
                                            >
                                                ĐĂNG NHẬP
                                            </Button>
                                            <Button variant='dark' className='me-1' onClick={() => handleLogin('/signup', navigate)}>
                                                ĐĂNG KÝ
                                            </Button>
                                        </>
                                    )}
                                </Nav>
                            </Fade>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </header >
            <Outlet />
        </>
    );
}

export default Header;

