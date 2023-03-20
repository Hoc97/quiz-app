import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import './ScrollButton.scss';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const getID = document.getElementById('root');
    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = getID.scrollTop;
            // console.log('scrolled', scrolled);
            if (scrolled > 500) {
                setVisible(true);
                setOpacity(opacity => {
                    if (opacity >= 1)
                        return 1;
                    return getID.scrollTop / 500 - 1;
                });
                return;
            }
            if (scrolled < 500) {
                setVisible(false);
                setOpacity(0);
            }
        };
        getID.addEventListener('scroll', toggleVisible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.log(visible);
    return (
        <div >
            {/* 👇️ scroll to top on button click */}
            <button
                style={{
                    display: visible ? 'block' : 'none',
                    opacity: opacity
                }}
                className='btn-scroll'
                onClick={() => {
                    getID.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}

            >
                <FaAngleUp />
            </button>
        </div>

    );
};

export default ScrollButton;