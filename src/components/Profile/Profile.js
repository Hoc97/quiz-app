import { useState } from 'react';
import AccountInfor from './ContentProfile/AccountInfor';
import History from './ContentProfile/History';
import Password from './ContentProfile/Password';
import './Profile.scss';
function Profile() {
    const [color, setColor] = useState(1);
    const handleColor = (n) => {
        setColor(n);
    };
    return (
        <div className='container profile-container'>
            <div className='header'>
                <span className={color === 1 ? 'active' : ''} onClick={() => handleColor(1)}>Account infomation</span>
                <span className={color === 2 ? 'active' : ''} onClick={() => handleColor(2)}>Password</span>
                <span className={color === 3 ? 'active' : ''} onClick={() => handleColor(3)}>History</span>
            </div>
            <div className='content'>
                {color === 1 && <AccountInfor />}
                {color === 2 && <Password />}
                {color === 3 && <History />}
            </div>
        </div>
    );
}

export default Profile;


