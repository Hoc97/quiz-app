import './User.scss';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Topic1 from './Topic/Topic1';
import Topic2 from './Topic/Topic2';
import Topic3 from './Topic/Topic3';


function User() {
    const [content, setContent] = useState(1);
    useEffect(() => {
        if (localStorage.getItem('scrollpos')) {
            window.scrollTo(0, localStorage.getItem('scrollpos'));
        }
        const save = () => {
            if (window.pageYOffset) {
                localStorage.setItem('scrollpos', window.pageYOffset);
            }
        };
        document.addEventListener('scroll', save);
        return () => document.removeEventListener('scroll', save);
    }, []);

    const handleContent = (n) => {
        setContent(n);
    };
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <div className='user-container container'>
                    <div className='header'>
                        <span className={content === 1 ? 'active' : ''} onClick={() => handleContent(1)}>LUYỆN TẬP TOEIC</span>
                        <span className={content === 2 ? 'active' : ''} onClick={() => handleContent(2)}>ĐỀ THI TOEIC RÚT GỌN</span>
                        <span className={content === 3 ? 'active' : ''} onClick={() => handleContent(3)}>ĐỀ THI THỬ TOEIC</span>
                    </div>
                    {content === 1 && <Topic1 />}
                    {content === 2 && <Topic2 />}
                    {content === 3 && <Topic3 />}
                </div>
            </div>
        </div>
    );
}

export default User;
