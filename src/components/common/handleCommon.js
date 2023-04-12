
import { useState, useEffect } from 'react';
const handleLogin = (path, navigate) => {
    navigate(path);
};

const handleQuickLogin = (email, password, setAccount) => {
    setAccount({ email, password });
};
const handleLogout = async (account, dispatch, navigate) => {
    dispatch({
        type: 'POST_LOGOUT',
        data: { email: account.email, refresh_token: account.refresh_token },
        navigate,
    });
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
};

const handleStart = (hours = 0, minutes = 0, seconds = 0, index, dispatch) => {
    const expire = new Date();
    expire.setHours(expire.getHours() + hours, expire.getMinutes() + minutes, expire.getSeconds() + seconds + 1);
    const time2 = expire.getTime();
    dispatch({ type: 'SET_TIMER_QUIZ', time: time2, payload: index });

};

export {
    handleLogin,
    handleQuickLogin,
    handleLogout,
    useDebounce,
    handleStart
};