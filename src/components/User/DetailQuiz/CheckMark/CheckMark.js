import CountDown from './CountDown';
import { useRef, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';
import _ from 'lodash';
import ModalNotiRerefsh from '../ModalNotiRerefsh';
import ModalNotiSubmit from '../ModalNotiSubmit';

function CheckMark({
    dataQuiz,
    setDataQuiz,
    handleFinishQuiz,
    setCurrentQuestion,
    currentQuestion,
    currentPart,
    arrayIndexPara,
    setIndexQuestion,
    isShowResultQuiz
}) {
    const refDiv = useRef([]);
    const [isShowModalRefresh, setIsShowModalRefresh] = useState(false);
    const [isShowModalSubmit, setIsShowModalSubmit] = useState(false);
    const [answered, setAnswered] = useState(0);
    let timer = 60 * 60;
    const [count, setCount] = useState(timer);
    const questionSelected = (question, index, currentQuestion) => {
        if (!question.answers.length) return '';
        let _class = '';
        let isUnAnswered = question.answers.every(answer => answer.isSelected === false);

        if (index === currentQuestion) {
            _class += ' clicked';
        }
        if (isUnAnswered === false) {
            _class += ' selected';
        }

        return _class.trim();
    };

    const handleClickQuestion = (index) => {
        setCurrentQuestion(index);
        if (+currentPart !== 7) return;
        const a = arrayIndexPara.filter(item => index >= item);
        const b = arrayIndexPara.findIndex(item => item === Math.max(...a));
        setIndexQuestion(b);
    };

    const handleRefresh = () => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        dataQuizClone.forEach(question => {
            question.answers.forEach(answer => {
                answer.isSelected = false;
            });
        });
        setDataQuiz(dataQuizClone);
        setCurrentQuestion(0);
        setCount(timer);
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
                <button className='check' disabled={false}//isShowResultQuiz
                    style={isShowResultQuiz ? { cursor: "not-allowed", opacity: '0.5' } : {}}
                    onClick={() => handleConfirmSubmit()} >
                    <>
                        <span className='check-icon'><RiSendPlaneFill /></span>
                        <span className='check-text'>Submit</span>
                    </>
                </button>
                <div className='refresh' disabled={false} onClick={() => handleConfirmRefresh()}
                    style={isShowResultQuiz ? { cursor: "not-allowed", opacity: '0.5' } : {}}
                >
                    <span className='refresh-icon'><HiOutlineRefresh /></span>
                    <span className='refresh-text'>Refresh</span>
                </div>
                <CountDown
                    handleFinishQuiz={handleFinishQuiz}
                    dataQuiz={dataQuiz}
                    count={count}
                    setCount={setCount}
                />
            </div>
            <div className='note'>
                <h4>Note:</h4>
                <p>
                    <span className='note-number answered'>1</span>
                    <span>Answered</span>
                </p>
                <p>
                    <span className='note-number isfocusing '>1</span>
                    <span>Is Focusing</span>
                </p>
                <p>
                    <span className='note-number notselected'>1</span>
                    <span>Not Selected</span>
                </p>
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
                                    className={`number-detail ${questionSelected(question, index, currentQuestion)} `}
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