import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';

function ListQuiz({ action, colorBtn }) {
    const navigate = useNavigate();

    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, []);
    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res.EC === 0) {
            // console.log(res.DT);
            setArrQuiz(res.DT);
        }
    };
    console.log('arrQuiz', arrQuiz);
    return (
        <div className='listquiz-container container'>
            {arrQuiz.length > 0 ? (
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={index} className='card'>
                            <div className='image'>
                                <img
                                    src={`data:image/jpeg;base64,${quiz.image}`}
                                    alt='' />
                            </div>
                            <div className='card-content'>
                                <h4>Quiz {index + 1}</h4>
                                <p className='card-description'>{quiz.description}</p>
                                <Button
                                    className='btn'
                                    variant={colorBtn}
                                    onClick={() =>
                                        navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })
                                    }
                                >
                                    {action}
                                </Button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <h2 className='no-quiz'>You don't have any quiz now...</h2>
                </>
            )}
        </div>
    );
}

export default ListQuiz;
