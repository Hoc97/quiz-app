import React from 'react';

const Title = ({ topic, description }) => {
    return (
        <div className='topic-title'>
            <h2>{topic}</h2>
            <span>{description}</span>
        </div>
    );
};

export default Title;