import { useEffect, useState } from 'react';
import './TimeDate.scss';
const Clock = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div className='clock'>{clock}</div>
    );
};

export default Clock;