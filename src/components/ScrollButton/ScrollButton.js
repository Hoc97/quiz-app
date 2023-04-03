import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import './ScrollButton.scss';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false);

    const getID = document.getElementById('root');
    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = getID.scrollTop;
            // console.log('scrolled', scrolled);
            if (scrolled > 500) {
                setVisible(true);
                return;
            }
            setVisible(false);
        };
        getID.addEventListener('scroll', toggleVisible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div >
            {/* 👇️ scroll to top on button click */}
            <button
                style={visible ?
                    {
                        transition: '2s all ease-in-out', opacity: '1'
                    } : { opacity: '0' }}
                className='btn-scroll'
                onClick={() => {
                    getID.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
            >
                <span className='rorate-scroll'></span>
                <FaAngleUp />
            </button>
        </div>

    );
};

export default ScrollButton;