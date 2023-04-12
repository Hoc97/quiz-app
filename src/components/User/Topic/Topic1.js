import Title from './Title';
import ListQuiz from '../ListQuiz';
const Topic1 = () => {
    return (
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
    );
};

export default Topic1;