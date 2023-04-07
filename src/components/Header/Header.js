import './Header.scss';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
import { SlBell } from 'react-icons/sl';
import { child, onValue, ref, update } from 'firebase/database';
import { database } from '../../firebase/config';



function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [showNoti, setShowNoti] = useState(false);
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const account = useSelector((state) => state.accountManage.account);
    const role = useSelector(state => state.accountManage.account.role);
    const listNoti = useSelector(state => state.notiManage.listNoti);
    const listActive = useSelector(state => state.notiManage.listActive);
    const numNoti = useSelector(state => state.notiManage.numNoti);



    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);
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
    console.log('listNoti', listNoti);
    useEffect(() => {
        const dbRef = ref(database);
        update(child(dbRef, 'user/2'), {
            userEmail: '',
            quizID: ''
        });
        onValue(child(dbRef, 'user'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataNoti = Object.values(data).find(item => item.userEmail === account.email);
                console.log('dataNoti', dataNoti);
                if (dataNoti) {
                    dispatch({ type: 'GET_DATA_NOTIFICATION', payload: dataNoti });
                }
            }

        });
    }, []);
    const btnRef = useRef();
    useEffect(() => {
        const closeNoti = (e) => {
            if (btnRef.current && !btnRef.current.contains(e.target)) {
                setShowNoti(false);
                if (showNoti) {
                    dispatch({ type: 'RESET_ACTIVE' });
                }
            }
        };

        document.addEventListener('mousedown', closeNoti);

        return () => document.removeEventListener('mousedown', closeNoti);
    }, [showNoti]);

    const handleNoti = () => {
        setShowNoti(showNoti => !showNoti);
        if (showNoti) {
            dispatch({ type: 'RESET_ACTIVE' });
            return;
        }
        dispatch({ type: 'RESET_NUMBER_NOTIFICATION' });
    };
    const handleActive = (noti) => {
        let _class = '';
        const activeNoti = listActive.some(active => {
            return active.quizID === noti.quizID;
        });
        if (activeNoti) _class = 'active-noti';
        return _class;
    };
    return (
        <>
            <header className='wrapper-header' style={{ backgroundColor: pathname === "/" ? 'white' : 'bisque' }}>
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
                                        <span className='pointer intro' onClick={() => scrollTo('')}>
                                            THI ĐẤU
                                        </span>
                                    </>
                                }
                            </Fade>
                            {pathname === "/user" &&
                                <div className='noti-bell' ref={btnRef} onClick={() => handleNoti()}>
                                    <Fade bottom>
                                        <span className='bell' ><SlBell /></span>
                                    </Fade>
                                    {numNoti > 0 && <span className='number'>{numNoti}</span>}
                                    <div className={`noti-text ${showNoti ? 'active' : ''} `} >
                                        <div className='header-noti'> Notifications</div>
                                        {listNoti.length > 0 && listNoti.map((noti, index) => {
                                            return <div className={handleActive(noti)} key={index}> Bạn nhận được bài test ID: {noti.quizID}</div>;
                                        })}
                                    </div>

                                </div>

                            }
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
            </header >
            <Outlet />
        </>
    );
}

export default Header;

