import { useEffect } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { toHHMMSS } from '../../../../utils/commonFunction';
function CountDown({
    handleFinishQuiz,
    dataQuiz,
    setCount,
    count
}) {
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
    return (
        <>
            <div className='time'>
                <span className="time-icon"><FcAlarmClock /></span >
                <span className='time-count'>{toHHMMSS(count)}</span>
            </div>
        </>
    );
}
export default CountDown;