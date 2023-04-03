import { useState, memo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timerQuizToSecs, toHHMMSS } from '../../utils/commonFunction';
function CountDownListQuiz({ index }) {
    const dispatch = useDispatch();
    const [count, setCount] = useState('00 : 00 : 00');
    const timerQuiz = useSelector(state => state.quizManage.listTimerQuiz[index]);
    useEffect(() => {
        let secs = timerQuizToSecs(timerQuiz);
        if (secs === 0) return;
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
    // console.log('count', count);

    if (index === -1) return <>Error</>;
    return (
        <>
            <span className='countdown-listquiz'>
                <span className='time-count'>{count}</span>
            </span>
        </>
    );
}
export default memo(CountDownListQuiz);