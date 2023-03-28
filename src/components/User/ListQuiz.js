import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

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
    let newArrQuiz = _.cloneDeep(arrQuiz);
    newArrQuiz = newArrQuiz.map((quiz, index) => {
        // quiz.order = quiz.description.replace(/\D+/g, '');
        quiz.order = quiz.description.match(/\d+\w*:/g)[0].replace(':', '');
        return quiz;
    });
    newArrQuiz = _.orderBy(newArrQuiz, ['order'], ['asc']);
    return (
        <div className='listquiz-container container'>
            {newArrQuiz.length > 0 ? (
                newArrQuiz.map((quiz, index) => {
                    if (quiz.description.indexOf(': ') > -1) {
                        quiz.title = quiz.description.slice(0, quiz.description.indexOf(': '));
                        quiz.description = quiz.description.slice(quiz.title.length + 2);
                    }

                    return (
                        <div key={index} className='card'>
                            <div className='image'>
                                <img
                                    src={`data:image/jpeg;base64,${quiz.image}`}
                                    alt='' />
                            </div>
                            <div className='card-content'>
                                <h3> {quiz.title}</h3>
                                <p className='card-description'>{quiz.description}</p>
                                <Button
                                    className='btn'
                                    variant={colorBtn}
                                    onClick={() =>
                                        navigate(`/quiz/${quiz.id}`, {
                                            state: {
                                                quizTitle: `${quiz.title}`,
                                                quizDescription: `${quiz.description}`,
                                                quizOrder: `${quiz.order.replace(/\D*/g, '')}`,
                                            }
                                        })
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
