import { child, onValue, ref, update } from 'firebase/database';
import { database } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { SlBell } from 'react-icons/sl';
import Fade from 'react-reveal/Fade';

const Notification = ({ account }) => {
    const dispatch = useDispatch();
    const [showNoti, setShowNoti] = useState(false);
    const listActive = useSelector(state => state.notiManage.listActive);
    const listNoti = useSelector(state => state.notiManage.listNoti);
    const numNoti = useSelector(state => state.notiManage.numNoti);
    const idUser = useSelector(state => {
        return state.userManage.listUser.find(user => user.email === account.email).id;
    });
    useEffect(() => {
        const dbRef = ref(database);
        update(child(dbRef, `user/${idUser}`), {
            userEmail: '',
            quizID: ''
        });
        onValue(child(dbRef, 'user'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataNoti = Object.values(data).find(item => item.userEmail === account.email);
                if (dataNoti) {
                    dispatch({ type: 'GET_DATA_NOTIFICATION', payload: dataNoti });
                }
            }
        });
    }, []);
    const btnRef = useRef();
    useEffect(() => {
        const closeNoti = (e) => {
            if (showNoti) {
                if (btnRef.current && !btnRef.current.contains(e.target)) {
                    setShowNoti(false);
                    dispatch({ type: 'RESET_ACTIVE' });
                }
            }
        };
        document.addEventListener('click', closeNoti);
        return () => document.removeEventListener('click', closeNoti);
    }, [showNoti]);

    const handleNoti = () => {
        setShowNoti(showNoti => !showNoti);
        if (showNoti) {
            dispatch({ type: 'RESET_ACTIVE' });
            return;
        }
        dispatch({ type: 'RESET_NUMBER_NOTIFICATION' });
    };
    const handleActive = (noti) => {
        let _class = '';
        const activeNoti = listActive.some(active => {
            return active.quizID === noti.quizID;
        });
        if (activeNoti) _class = 'active-noti';
        return _class;
    };
    return (
        <div className='noti-bell' ref={btnRef} onClick={() => handleNoti()}>
            <Fade bottom>
                <span className='bell' ><SlBell /></span>

            </Fade>
            <Fade bottom>
                {numNoti > 0 && <span className='number'>{numNoti}</span>}
            </Fade>
            <div className={`noti-text ${showNoti ? 'active' : ''} `} >
                <div className='header-noti'> Notifications</div>
                {listNoti.length > 0 && listNoti.map((noti, index) => {
                    return <div className={handleActive(noti)} key={index}> Bạn nhận được bài test ID: {noti.quizID}</div>;
                })}
            </div>
        </div>
    );
};

export default Notification;