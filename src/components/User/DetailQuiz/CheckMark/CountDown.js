import { useState } from 'react';
import { useEffect } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { timerQuizToSecs, toHHMMSS } from '../../../../utils/commonFunction';
function CountDown() {
    const params = useParams();
    const dispatch = useDispatch();
    const [count, setCount] = useState('00 : 00 : 00');
    const listQuiz = useSelector(state => state.quizManage.listQuiz);
    const index = listQuiz.findIndex(quiz => quiz.id === +params.id);
    const timerQuiz = useSelector(state => state.quizManage.listTimerQuiz[index]);

    useEffect(() => {
        let secs = timerQuizToSecs(timerQuiz);
        const timer = setInterval(() => {
            let a = toHHMMSS(secs);
            setCount(a);
            if (secs > 0) {
                secs--;
                return;
            }
            clearInterval(timer);
            dispatch({ type: 'RESET_TIMER_ROOM', payload: index });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerQuiz]);

    if (index === -1) return <>Error</>;
    return (
        <>
            <div className='time'>
                <span className="time-icon"><FcAlarmClock /></span >
                <span className='time-count'>{count}</span>
            </div>
        </>
    );
}
export default CountDown;