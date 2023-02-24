import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getDataQuestions } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
function DetailQuiz() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    // console.log(location);
    const quizID = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizID]);
    const fetchQuestions = async () => {
        let res = await getDataQuestions(quizID);
        console.log(res);
        if (res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy('id')
                // `key` is group's name (id), `answers` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
                    return { questionID: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
            console.log(data);
        }
    };

    const handleDown = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    const handleUp = () => {
        if (currentQuestion < 2) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    return (
        <>
            <div className='detail-quiz-container container'>
                <div className='content'>
                    <h2>
                        Quiz {quizID}: {location?.state?.quizTitle}
                    </h2>
                    <hr />
                    <div className='part-group'>
                        <div className='part-detail'>Part 1</div>
                        <div className='part-detail'>Part 2</div>
                        <div className='part-detail'>Part 3</div>
                        <div className='part-detail'>Part 4</div>
                        <div className='part-detail'>Part 5</div>
                    </div>
                    <p className='description'>
                        Look at the picture. Choose the sentence that best describes the picture:
                    </p>

                    <Question index={currentQuestion} data={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : {}} />
                    <div className='move-page'>
                        {/* {currentQuestion > 0 ? ( */}
                        <button
                            className='move'
                            disabled={currentQuestion === 0 ? true : false}
                            style={{ opacity: currentQuestion === 0 ? 0 : 1 }}
                            onClick={handleDown}
                        >
                            BACK
                        </button>
                        <button
                            className='move'
                            disabled={currentQuestion === 2 ? true : false}
                            style={{ opacity: currentQuestion === 2 ? 0 : 1 }}
                            onClick={handleUp}
                        >
                            NEXT
                        </button>
                        <div className='check-point'>Chấm điểm</div>
                    </div>
                </div>
                <div className='check-mark'>
                    <div className='check-header'>
                        <div className='check'>Chấm điểm</div>
                        <div className='time'>00 : 00 : 01</div>
                        <div className='refresh'>Làm lại</div>
                    </div>
                    <div className='list-mark'>
                        <div className='answer-mark'>
                            <span>1</span>
                        </div>
                        <div className='answer-mark'>
                            <span>2</span>
                        </div>
                        <div className='answer-mark'>
                            <span>3</span>
                        </div>
                        <div className='answer-mark'>
                            <span>4</span>
                        </div>
                        <div className='answer-mark'>
                            <span>5</span>
                        </div>
                        <div className='answer-mark'>
                            <span>6</span>
                        </div>
                        <div className='answer-mark'>
                            <span>7</span>
                        </div>
                        <div className='answer-mark'>
                            <span>8</span>
                        </div>
                        <div className='answer-mark'>
                            <span>9</span>
                        </div>
                        <div className='answer-mark'>
                            <span>10</span>
                        </div>
                        <div className='answer-mark'>
                            <span>11</span>
                        </div>
                        <div className='answer-mark'>
                            <span>12</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='text-user' onClick={() => navigate('/user')}>
                    &#60;&#60;&#60; Back to your page
                </div>
            </div>
        </>
    );
}

export default DetailQuiz;
