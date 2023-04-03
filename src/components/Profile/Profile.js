import { useState } from 'react';
import AccountInfor from './ContentProfile/AccountInfor';
import History from './ContentProfile/History';
import Password from './ContentProfile/Password';
import './Profile.scss';
function Profile() {
    const [content, setContent] = useState(1);
    const handleContent = (n) => {
        setContent(n);
    };
    return (
        <div className='container profile-container'>
            <div className='header'>
                <span className={content === 1 ? 'active' : ''} onClick={() => handleContent(1)}>Thông tin tài khoản</span>
                <span className={content === 2 ? 'active' : ''} onClick={() => handleContent(2)}>Mật khẩu</span>
                <span className={content === 3 ? 'active' : ''} onClick={() => handleContent(3)}>Lịch sử bài thi</span>
            </div>
            <div className='content'>
                {content === 1 && <AccountInfor />}
                {content === 2 && <Password />}
                {content === 3 && <History />}
            </div>
        </div>
    );
}

export default Profile;


