// import Header from '../Header/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import SideBar from '../SideBar/SideBar';
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/apiService';
import { toast } from 'react-toastify';

function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountManage.account);
    const [collapsed, setCollapsed] = useState(false);
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
                        <NavDropdown title='Settings' id='basic-nav-dropdown'>
                            <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                        </NavDropdown>

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
