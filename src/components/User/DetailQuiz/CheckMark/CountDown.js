import { useEffect, useState } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { toHHMMSS } from '../../../../utils/commonFunction';
import _ from 'lodash';
function CountDown({
    handleFinishQuiz,
    setCurrentQuestion,
    dataQuiz,
    setDataQuiz,
    setIndexQuestion,
    currentPart,
    isShowResultQuiz
}) {
    let timer = 60 * 60;
    const [count, setCount] = useState(timer);
    const [showBtnSubmit, setShowBtnSubmit] = useState(false);
    useEffect(() => {
        if (count === 0) {
            handleFinishQuiz();
            return;
        }
        const timer = setInterval(() => {
            if (dataQuiz.length > 0) {
                setCount(count => count - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataQuiz.length]);

    const handleRefresh = () => {
        setCurrentQuestion(0);
        setCount(timer);
        let dataQuizClone = _.cloneDeep(dataQuiz);
        dataQuizClone.forEach(question => {
            question.answers.forEach(answer => {
                answer.isSelected = false;
            });
        });
        setDataQuiz(dataQuizClone);
        if (+currentPart === 7) {
            setIndexQuestion(0);
        }
    };

    return (
        <>
            <button className='check' disabled={isShowResultQuiz} style={isShowResultQuiz ? { cursor: "not-allowed" } : {}}
                onClick={() => showBtnSubmit ? handleFinishQuiz() : setShowBtnSubmit(true)} >
                {showBtnSubmit ? (
                    <span>
                        <span className='check-icon'><RiSendPlaneFill /></span>
                        <span className='check-text'>Submit</span>
                    </span>
                ) : <span className='confirm'>Bạn có muốn nộp bài</span>}
            </button>
            <div className='time'>
                <span className="time-icon"><FcAlarmClock /></span >
                <span className='time-count'>{toHHMMSS(count)}</span>
            </div>
            <div className='refresh' onClick={() => handleRefresh()} >
                <span className='refresh-icon'><HiOutlineRefresh /></span>
                <span className='refresh-text'>Refresh</span>
            </div>
        </>
    );
}
export default CountDown;