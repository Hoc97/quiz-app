import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import './ListQuiz.scss';
import { FaFlagCheckered } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FcAlarmClock } from 'react-icons/fc';
import { timerQuizToSecs } from '../../utils/commonFunction';
import Images from '../../assets/img/Image';
import CountDownListQuiz from './CountDownListQuiz';

function ListQuiz({ action, colorBtn }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listQuiz = useSelector(state => state.quizManage.listQuiz);
    const isRefreshListQuiz = useSelector(state => state.quizManage.isRefreshListQuiz);
    const listTimerQuiz = useSelector(state => state.quizManage.listTimerQuiz);
    let a = [...Array(listQuiz.length)].map(n => false);
    let b = [];
    useEffect(() => {
        const timeMax = Math.max(...listTimerQuiz);
        let secs = timerQuizToSecs(timeMax);
        if (secs === 0) return;
        const timer = setInterval(() => {
            if (secs > 0) {
                secs--;
                return;
            }
            clearInterval(timer);
            dispatch({ type: 'REFRESH_LISTQUIZ' });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        if (isRefreshListQuiz) {
            dispatch({ type: 'RUN_LIST_QUIZ' });
            dispatch({ type: 'GET_LIST_QUIZ' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefreshListQuiz]);

    const handleStart = (hours = 0, minutes = 0, seconds = 0, index) => {
        const expire = new Date();
        expire.setHours(expire.getHours() + hours, expire.getMinutes() + minutes, expire.getSeconds() + seconds);
        const time2 = expire.getTime();
        dispatch({ type: 'SET_TIMER_QUIZ', time: time2, payload: index });

    };

    const handleEnterExam = (quiz, index) => {
        navigate(`/quiz/${quiz.id}`);
        if (!quiz.isInTimerRoom) {
            dispatch({ type: 'SET_TIMER_ROOM', payload: index });
            handleStart(0, 1, 10, index);
        }
    };
    return (
        <div className='listquiz-container container'>
            {listQuiz.length > 0 && (
                listQuiz.map((quiz, index) => {
                    b.push(quiz.order);
                    console.log('b', b);
                    let findIndex = listQuiz.findIndex((item) => item.order === b[index]);
                    console.log('findIndex', findIndex);
                    if (index === findIndex) a[index] = true;
                    return (
                        <div key={index} >
                            {a[index] &&
                                <div className='card' >
                                    <div className='image'>
                                        <img
                                            src={`data:image/jpeg;base64,${quiz.image}`}
                                            alt='' />
                                    </div>
                                    <div className='card-content'>
                                        <h3 className='part'> {quiz.title}</h3>
                                        <p className='card-description'>{quiz.description}</p>
                                    </div>
                                    <span className='clock'><FcAlarmClock />5 phút</span>
                                    <span className='question'><AiOutlineQuestionCircle />10 câu</span>
                                </div>}
                            {b[index] === '1'}
                        </div>
                    );
                })
            )}
            {listQuiz.length > 0 && (
                listQuiz.map((quiz, index) => {
                    return (
                        <div key={index} className={`item-quiz item-${index}`}>

                            <span className='quiz-index'>Test {index + 1}</span>

                            {quiz.isInTimerRoom ?
                                <span className='doing'>
                                    <span className='icon'>
                                        <img src={Images.Doing.icon} alt='' />
                                    </span>
                                    <span>Đang làm </span>
                                </span>
                                : <>
                                    {quiz.ParticipantQuiz.is_finish ?
                                        <span className='done'>
                                            <span className='icon'><FaFlagCheckered /></span>
                                            <span>Đã làm</span>
                                        </span>
                                        : <></>
                                    }
                                </>
                            }
                            {/* {quiz.isInTimerRoom && <CountDownListQuiz index={index} />} */}
                            <CountDownListQuiz index={index} />
                            <Button
                                className='btn-enter-exam'
                                variant={colorBtn}
                                onClick={() => handleEnterExam(quiz, index)}
                            >
                                {action}
                            </Button>
                        </div>
                    );
                }))}
        </div>
    );
}

export default ListQuiz;
