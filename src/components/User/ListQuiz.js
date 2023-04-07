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
import _ from 'lodash';


function ListQuiz({ action, colorBtn }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listQuiz = useSelector(state => state.quizManage.listQuiz);
    const isRefreshListQuiz = useSelector(state => state.quizManage.isRefreshListQuiz);
    const listTimerQuiz = useSelector(state => state.quizManage.listTimerQuiz);
    const listTimerPart = useSelector(state => state.quizManage.listTimerPart);
    const listQuestionPart = useSelector(state => state.quizManage.listQuestionPart);


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (isRefreshListQuiz) {
            dispatch({ type: 'RUN_LIST_QUIZ' });
            dispatch({ type: 'GET_LIST_QUIZ' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefreshListQuiz]);


    const handleEnterExam = (quiz) => {
        navigate(`/quiz/${quiz.id}`);
    };
    let c = listQuiz.map(quiz => listQuiz.findIndex((item) => item.order === quiz.order));
    let arrayIndexPart = [...new Set(c)];
    let dataPartQuiz = arrayIndexPart.map((indexPart, i) => {
        let listQuizClone = _.cloneDeep(listQuiz);
        listQuizClone[indexPart].dataItem = listQuiz.slice(arrayIndexPart[i], arrayIndexPart[i + 1]);
        return listQuizClone[indexPart];
    });




    return (
        <div className='listquiz-container container'>

            {dataPartQuiz.length > 0 && (
                dataPartQuiz.map((quiz, index) => {
                    return (
                        <div className='quiz-part' key={index} >
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
                                <span className='clock'><FcAlarmClock />{listTimerPart[`Part${index + 1}`][1]} phút</span>
                                <span className='question'><AiOutlineQuestionCircle />{listQuestionPart[index]} câu</span>
                            </div>
                            {/*  */}
                            {quiz.dataItem.map((item, i) => {
                                let indexTemp = i + arrayIndexPart[index];
                                let part = index + 1;
                                return (
                                    <div key={i} className={`item-quiz item-${indexTemp}`}>
                                        <span className='quiz-test'>Test {indexTemp + 1}</span>
                                        <span className='quiz-id'>ID: {item.id}</span>
                                        {item.isInTimerRoom ?
                                            <span className='doing'>
                                                <span className='icon'>
                                                    <img src={Images.Doing.icon} alt='' />
                                                </span>
                                                <span>Đang làm </span>
                                            </span>
                                            : <>
                                                {item.ParticipantQuiz.is_finish ?
                                                    <span className='done'>
                                                        <span className='icon'><FaFlagCheckered /></span>
                                                        <span>Đã làm</span>
                                                    </span>
                                                    : <></>
                                                }
                                            </>
                                        }
                                        {item.isInTimerRoom && <CountDownListQuiz index={indexTemp} />}
                                        <Button
                                            className={`btn-enter-exam ${indexTemp}`}
                                            variant={colorBtn}
                                            onClick={() => handleEnterExam(item, indexTemp, part)}
                                        >
                                            {action}
                                        </Button>
                                    </div>
                                );
                            })}

                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ListQuiz;
