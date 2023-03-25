import React, { useEffect, useState } from 'react';
import './TimeDate.scss';
const Clock = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        }, 1000);
    }, []);
    return (
        <div className='clock'>{clock}</div>
    );
};

export default Clock;