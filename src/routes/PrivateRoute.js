import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role, name }) {
    const isAuthenticated = useSelector((state) => state.accountManage.isAuthenticated);
    const [isShow, setIsShow] = useState(false);
    const arrUser = ['user', 'admin'];
    const arrAdmin = ['user', 'admin'];
    useEffect(() => {
        if (role === 'USER' && arrUser.includes(name)) setIsShow(true);
        if (role === 'ADMIN' && arrAdmin.includes(name)) setIsShow(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isAuthenticated ?
                <>{isShow && children} </>
                : <Navigate to={'/login'} />}
        </>
    );
}

export default PrivateRoute;