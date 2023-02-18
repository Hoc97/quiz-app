// import Header from '../Header/Header';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBar from '../SideBar/SideBar';
import './Admin.scss';
function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar collapsed={collapsed} />
            </div>
            <div className='admin-content'>
                <div className='admin-header'>
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className='admin-main'>Content here</div>
            </div>
        </div>
    );
}

export default Admin;
