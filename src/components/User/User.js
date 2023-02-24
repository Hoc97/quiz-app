import './User.scss';
import Header from '../Header/Header';
import ListQuiz from './ListQuiz';
function User() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='user-container'>
                <ListQuiz />
            </div>
        </div>
    );
}

export default User;
