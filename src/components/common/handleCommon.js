
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
    }, [value]);

    return debouncedValue;
};


export {
    handleLogin,
    handleQuickLogin,
    handleLogout,
    useDebounce
};