import { useEffect, useState } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';

import _ from 'lodash';
function CountDown({ handleFinishQuiz, setCurrentQuestion, dataQuiz, setDataQuiz }) {
    let timer = 60 * 60;
    const [count, setCount] = useState(timer);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(" : ");
    };
    useEffect(() => {
        if (count === 0) {
            handleFinishQuiz();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

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
    };
    return (
        <>
            <div className='check' onClick={() => handleFinishQuiz()} >
                <span className='check-icon'><RiSendPlaneFill /></span>
                <span className='check-text'>Finish</span>
            </div>
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