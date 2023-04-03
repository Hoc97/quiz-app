import { useState } from 'react';
import Header from '../Header/Header';
import Title from './DetailQuiz/Title';
import ListQuiz from './ListQuiz';
import './User.scss';
function User() {
    const [content, setContent] = useState(1);
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
                    {content === 1 &&
                        <div className='topic'>
                            <Title
                                topic='LUYỆN TẬP TOEIC'
                                description='Câu hỏi luyện tập TOEIC có đáp án và được giải thích cặn kẽ, giúp bạn
                        luyện thi TOEIC hiệu quả & thuận tiện'
                            />
                            <ListQuiz
                                action='Luyện'
                                colorBtn={'success'}
                            />
                        </div>}
                    {content === 2 &&
                        <div className='topic'>
                            <Title
                                topic='ĐỀ THI TOEIC RÚT GỌN'
                                description='~20 phút / đề, với đáp án & giải thích chi tiết, giúp bạn có thể thi thử TOEIC hàng tuần'
                            />
                            <h1>Coming soon...</h1>
                        </div>}
                    {content === 3 &&
                        <div className='topic'>
                            <Title
                                topic='ĐỀ THI THỬ TOEIC'
                                description='Thi thử TOEIC với 50+ đề thi thử TOEIC (120 phút / đề) với đáp án và giải thích chi tiết'
                            />
                            <h1>Coming soon...</h1>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default User;
