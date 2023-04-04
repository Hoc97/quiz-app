import CountDown from './CountDown';
import { useRef, useState } from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { RiSendPlaneFill } from 'react-icons/ri';
import _ from 'lodash';
import ModalNotiRerefsh from '../ModalNotiRerefsh';
import ModalNotiSubmit from '../ModalNotiSubmit';
import { useDispatch, useSelector } from 'react-redux';

function CheckMark({
    dataQuiz,
    setDataQuiz,
    handleFinishQuiz,
    setCurrentQuestion,
    currentQuestion,
    currentPart,
    arrayIndexPara,
    setIndexQuestion,
    isShowResultQuiz,
    isShowAnswer,
    submissionResult,
    index
}) {
    const dispatch = useDispatch();
    const listTimerPart = useSelector(state => state.quizManage.listTimerPart);
    const refDiv = useRef([]);
    const [isShowModalRefresh, setIsShowModalRefresh] = useState(false);
    const [isShowModalSubmit, setIsShowModalSubmit] = useState(false);
    const [answered, setAnswered] = useState(0);

    const questionResult = (question) => {
        for (const answer of question.answers) {
            if (answer.isSelected) {
                if (answer.isCorrect) return 'correct';
                return 'incorrect';
            }
        }
        return 'not-answered';
    };

    const questionSelected = (question, index, currentQuestion) => {
        if (!question.answers.length) return '';
        let _class = '';
        let isUnAnswered = question.answers.every(answer => answer.isSelected === false);
        if (index === currentQuestion) _class += ' clicked';
        if (isUnAnswered === false) _class += ' selected';
        return _class.trim();
    };

    const handleClickQuestion = (index) => {
        setCurrentQuestion(index);
        if (+currentPart !== 7) return;
        const a = arrayIndexPara.filter(item => index >= item);
        const b = arrayIndexPara.findIndex(item => item === Math.max(...a));
        setIndexQuestion(b);
    };

    const handleStart = (hours = 0, minutes = 0, seconds = 0, index) => {
        const expire = new Date();
        expire.setHours(expire.getHours() + hours, expire.getMinutes() + minutes, expire.getSeconds() + seconds);
        const time2 = expire.getTime();
        dispatch({ type: 'SET_TIMER_QUIZ', time: time2, payload: index });

    };
    const handleRefresh = () => {
        // reset time
        const [hours, minutes, seconds] = listTimerPart[`Part${currentPart}`];
        handleStart(hours, minutes, seconds, index);

        //reset question
        let dataQuizClone = _.cloneDeep(dataQuiz);
        dataQuizClone.forEach(question => {
            question.answers.forEach(answer => {
                answer.isSelected = false;
            });
        });
        setDataQuiz(dataQuizClone);
        setCurrentQuestion(0);
        setIsShowModalRefresh(false);
        if (+currentPart === 7) {
            setIndexQuestion(0);
        }
    };

    const handleConfirmRefresh = () => {
        for (const question of dataQuiz) {
            for (const answer of question.answers) {
                if (answer.isSelected) {
                    setIsShowModalRefresh(true);
                    return;
                }
            }
        }
    };

    const handleConfirmSubmit = () => {
        let answered = 0;
        for (const question of dataQuiz) {
            for (const answer of question.answers) {
                if (answer.isSelected) {
                    answered++;
                    break;
                }
            }
        }
        if (answered === dataQuiz.length) {
            handleFinishQuiz();
            return;
        }
        setAnswered(answered);
        setIsShowModalSubmit(true);
    };

    return (
        <div className='check-mark'>
            <div className='check-header'>
                <button className='check' disabled={isShowResultQuiz}//isShowResultQuiz
                    style={isShowResultQuiz ? { cursor: "not-allowed", opacity: '0.5' } : {}}
                    onClick={() => handleConfirmSubmit()} >
                    <>
                        <span className='check-icon'><RiSendPlaneFill /></span>
                        <span className='check-text'>Submit</span>
                    </>
                </button>
                <div className='refresh' disabled={isShowResultQuiz} onClick={() => handleConfirmRefresh()}
                    style={isShowResultQuiz ? { cursor: "not-allowed", opacity: '0.5' } : {}}
                >
                    <span className='refresh-icon'><VscDebugRestart /></span>
                    <span className='refresh-text'>Restart</span>
                </div>
                <CountDown
                    handleFinishQuiz={handleFinishQuiz}
                    dataQuiz={dataQuiz}
                />
            </div>
            <div className='note'>
                <h4>Chú thích:</h4>
                <p>
                    {isShowAnswer ?
                        <>
                            <span className='note-number correct'></span>
                            <span>{submissionResult.numberCorrect} câu đúng</span>
                        </> :
                        <>
                            <span className='note-number answered'>1</span>
                            <span> Đã trả lời</span>
                        </>
                    }
                </p>
                <p>
                    {isShowAnswer ?
                        <>
                            <span className='note-number incorrect'></span>
                            <span>{submissionResult.numberIncorrect} câu sai</span>
                        </> :
                        <>
                            <span className='note-number isfocusing '>1</span>
                            <span>Đang chọn </span>
                        </>
                    }
                </p>
                <p>
                    {isShowAnswer ?
                        <>
                            <span className={!!submissionResult.numberNotanswered ? 'note-number not-answered' : ''}></span>
                            {!!submissionResult.numberNotanswered &&
                                <span> {submissionResult.numberNotanswered} câu chưa làm</span>}


                        </> :
                        <>
                            <span className='note-number notselected'>1</span>
                            <span>Chưa được chọn</span>
                        </>
                    }
                </p>
                <span className='result'>{submissionResult.numberCorrect} / {dataQuiz.length}</span>
            </div>
            <div className='list-mark'>
                <div className='list'>
                    {dataQuiz.length > 0 && dataQuiz.map((question, index) => {
                        return (
                            <div
                                key={index}
                                className='mark-answer'
                                onClick={() => handleClickQuestion(index)}
                            >
                                <span
                                    className={`number-detail 
                                    ${isShowAnswer ? questionResult(question)
                                            : questionSelected(question, index, currentQuestion)} `}
                                    ref={element => refDiv.current[index] = element}
                                >
                                    {index + 1}
                                </span>
                            </div>
                        );
                    })}
                </div >
            </div >
            <ModalNotiRerefsh
                show={isShowModalRefresh}
                setShow={setIsShowModalRefresh}
                handleRefresh={handleRefresh}
            />
            <ModalNotiSubmit
                show={isShowModalSubmit}
                setShow={setIsShowModalSubmit}
                handleFinishQuiz={handleFinishQuiz}
                answered={answered}
                lengthQuiz={dataQuiz.length}
            />
        </div >
    );
};

export default CheckMark;;;