import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';

function ListQuiz() {
    const navigate = useNavigate();

    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, []);
    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res.EC === 0) {
            console.log(res.DT);
            setArrQuiz(res.DT);
        }
    };
    return (
        <div className='listquiz-container container'>
            {arrQuiz.length > 0 ? (
                arrQuiz.map((quiz, index) => {
                    return (
                        <Card key={index} style={{ width: '18rem' }} className='card'>
                            <Card.Img
                                variant='top'
                                className='img'
                                src={`data:image/jpeg;base64,${quiz.image}`}
                                alt=''
                            />
                            <Card.Body>
                                <Card.Title>Quiz {index + 1}</Card.Title>
                                <Card.Text>{quiz.description}</Card.Text>
                                <Button
                                    className='btn'
                                    variant='primary'
                                    onClick={() =>
                                        navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })
                                    }
                                >
                                    Start now
                                </Button>
                            </Card.Body>
                        </Card>
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
