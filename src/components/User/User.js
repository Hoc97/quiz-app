import './User.scss';
import Header from '../Header/Header';
function User() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='user-container'>
                <div className='content'>
                    <div>Sidebar</div>
                    <div className='content'>User</div>
                </div>
            </div>
        </div>
    );
}

export default User;
