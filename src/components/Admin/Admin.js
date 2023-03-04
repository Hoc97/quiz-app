// import Header from '../Header/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import SideBar from '../SideBar/SideBar';
import './Admin.scss';
import { Outlet } from 'react-router-dom';
import Languages from '../Languages/Languages';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/apiService';
import { doLogout } from '../../redux/action/action';
import { toast } from 'react-toastify';

function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.userManage.account);
    const [collapsed, setCollapsed] = useState(false);
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
                        <Languages />
                        <NavDropdown title='Settings' id='basic-nav-dropdown'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
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
