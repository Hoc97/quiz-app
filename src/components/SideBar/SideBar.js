import './SideBar.scss';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaMapMarkedAlt, FaMoon } from 'react-icons/fa';
import { IoDiamondSharp, IoCalendarClear, IoDocument } from 'react-icons/io5';
import { MdFeaturedPlayList, MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

// import sidebarBg from '../../assets/img/bg2.jpg';
import logoBg from '../../assets/img/logo-react.svg';
import { useEffect } from 'react';
function SideBar({ collapsed }) {
    const { collapseSidebar } = useProSidebar();
    // console.log(collapsed);
    useEffect(() => {
        collapseSidebar(collapsed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapsed]);
    return (
        <div className='sidebar'>
            <Sidebar>
                <div className='sidebar-container'>
                    <Link to={'/admin'}>
                        <div className='sidebar-header'>
                            <img className='img-sidebar-header' src={logoBg} alt='' />
                            {collapsed ? '' : <span>HỌC ĐI CODE DẠO</span>}
                        </div>
                    </Link>
                    <Menu className='menu'>
                        <div className='sidebar-content hr'>
                            <div style={{ opacity: collapsed ? 0 : 1, letterSpacing: '0.5px' }}> General</div>
                        </div>
                        <SubMenu
                            suffix={<span className='circle'>6</span>}
                            icon={<MdFeaturedPlayList />}
                            label='Features'
                        >
                            <MenuItem component={<Link to='/admin/users-manage' />}> Users Management </MenuItem>
                            <MenuItem component={<Link to='/admin/quiz-manages' />}> Quiz Management </MenuItem>
                            <MenuItem component={<Link to='/admin/questions-manages' />}>Questions Management</MenuItem>
                        </SubMenu>
                        <SubMenu icon={<FaMapMarkedAlt />} label='Map'>
                            <MenuItem> Google maps </MenuItem>
                            <MenuItem> Open street maps </MenuItem>
                        </SubMenu>
                        <SubMenu icon={<FaMoon />} label='Theme'>
                            <MenuItem> Dark </MenuItem>
                            <MenuItem> Light </MenuItem>
                            <SubMenu label='Forms'>
                                <MenuItem> Input </MenuItem>
                                <MenuItem> Selector </MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu icon={<IoDiamondSharp />} label='Component'>
                            <MenuItem> Grid </MenuItem>
                            <MenuItem> Layout </MenuItem>
                        </SubMenu>
                        <div className='sidebar-content hr'>
                            <div
                                style={{
                                    opacity: collapsed ? 0 : 1,
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Extra
                            </div>
                        </div>
                        <MenuItem suffix={<span className='arounded'>New</span>} icon={<IoCalendarClear />}>
                            Calendar
                        </MenuItem>
                        <MenuItem icon={<IoDocument />}> Documentation </MenuItem>
                    </Menu>
                    <div className='sidebar-content hr account'>
                        {collapsed ? (
                            <MdAccountCircle size={50} color={'fff'} />
                        ) : (
                            <div>&#169; Cao Thái Học Account</div>
                        )}
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}

export default SideBar;
