import React from 'react';
import './TimeDate.scss';
const ClockDate = () => {
    return (
        <div className='date'>{new Date().toLocaleDateString('en-GB')}</div>
    );
};

export default ClockDate;