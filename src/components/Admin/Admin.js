import './Admin.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import SideBar from '../SideBar/SideBar';
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { handleLogout } from '../common/handleCommon';

function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountManage.account);
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <div className='admin-header'>
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className='admin-header-left' />
                    </span>
                    <div className='admin-header-right'>
                        <Fade bottom>
                            <Nav className='settings'>
                                {isAuthenticated && (
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
                                        <NavDropdown.Item onClick={() => handleLogout(account, dispatch, navigate)}>Đăng xuất</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Fade>

                    </div>
                </div>
                <div className='admin-main'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Admin;
