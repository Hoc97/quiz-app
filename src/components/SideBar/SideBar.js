import './SideBar.scss';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaMoon } from 'react-icons/fa';
import { IoCalendarClear, IoDocument } from 'react-icons/io5';
import { MdFeaturedPlayList, MdAccountCircle } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Admin } from '../../assets/img/Image';
import { useEffect } from 'react';
function SideBar({ collapsed }) {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();
    useEffect(() => {
        collapseSidebar(collapsed);
    }, [collapsed]);
    return (
        <div className='sidebar'>
            <Sidebar>
                <div className='sidebar-container'>
                    <Link to={'/'}>
                        <div className='sidebar-header'>
                            <img className='img-sidebar-header' src={Admin.admin} alt='' />
                            {collapsed ? '' : <span>TRANG QUẢN TRỊ</span>}
                        </div>
                    </Link>
                    <Menu className='menu'>
                        <div className='sidebar-content hr'>
                            <div style={{ opacity: collapsed ? 0 : 1, letterSpacing: '0.5px' }}> General</div>
                        </div>
                        <MenuItem className='dashboard'
                            onClick={() => navigate('/admin')}
                            icon={<RiDashboardLine className='icon-dashboard' />}>
                            Dashboard
                        </MenuItem>
                        <SubMenu
                            suffix={<span className='circle'>3</span>}
                            icon={<MdFeaturedPlayList />}
                            label='Features'
                        >
                            <MenuItem component={<Link to='/admin/manage-users' />}> Users Management </MenuItem>
                            <MenuItem component={<Link to='/admin/manage-quizzes' />}> Quizzes Management </MenuItem>
                            <MenuItem component={<Link to='/admin/manage-questions' />}>Questions Management</MenuItem>
                        </SubMenu>

                        <SubMenu icon={<FaMoon />} label='Theme'>
                            <MenuItem> Dark </MenuItem>
                            <MenuItem> Light </MenuItem>
                        </SubMenu>
                        <div className='sidebar-content hr'>
                            <div
                                style={{
                                    opacity: collapsed ? 0 : 1,
                                    letterSpacing: '0.5px',
                                }}>
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
