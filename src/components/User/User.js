import Header from '../Header/Header';
import Title from './DetailQuiz/Title';
import ListQuiz from './ListQuiz';
import './User.scss';
function User() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <div className='user-container container'>
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
                    </div>
                    {/* <div className='topic'>
                        <Title
                            topic='ĐỀ THI TOEIC RÚT GỌN'
                            description='~20 phút / đề, với đáp án & giải thích chi tiết, giúp bạn có thể thi thử TOEIC hàng tuần'
                        />
                        <ListQuiz
                            action='Start now'
                            colorBtn={'info'}
                        />
                    </div>
                    <div className='topic'>
                        <Title
                            topic='ĐỀ THI THỬ TOEIC'
                            description='Thi thử TOEIC với 50+ đề thi thử TOEIC (120 phút / đề) với đáp án và giải thích chi tiết'
                        />
                        <ListQuiz
                            action='Start now'
                            colorBtn={'info'}
                        />
                    </div>
                    <div className='topic'>
                        <Title
                            topic='LUYỆN TẬP TOEIC'
                            description='Câu hỏi luyện tập TOEIC có đáp án và được giải thích cặn kẽ, giúp bạn luyện thi TOEIC hiệu 
                            quả & thuận tiện'
                        />
                        <ListQuiz
                            action='Start now'
                            colorBtn={'info'}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default User;
