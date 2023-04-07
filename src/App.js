import React, { Suspense, useEffect, useState } from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import User from './components/User/User';
import PreLoad from './assets/css/PreLoad';
import Home from './components/Home/Home';
const Admin = React.lazy(() => import('./components/Admin/Admin'));
const ManageUser = React.lazy(() => import('./components/Admin/Content/ManageUser/ManageUser'));
const DashBoard = React.lazy(() => import('./components/Admin/Content/DashBoard'));
const ManageQuiz = React.lazy(() => import('./components/Admin/Content/ManageQuiz/ManageQuiz'));
const ManageQuestion = React.lazy(() => import('./components/Admin/Content/ManageQuestion/ManageQuestion'));
const Login = React.lazy(() => import('./components/Auth/Login'));
const SignUp = React.lazy(() => import('./components/Auth/SignUp'));
const DetailQuiz = React.lazy(() => import('./components/User/DetailQuiz/DetailQuiz'));
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'));
const PrivateRoute = React.lazy(() => import('./routes/PrivateRoute'));
const ScrollButton = React.lazy(() => import('./components/ScrollButton/ScrollButton'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const Header = React.lazy(() => import('./components/Header/Header'));

// ****//


function App() {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            setTimeout(() => {
                setLoad(false);
            }, 12000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const role = useSelector(state => state.accountManage.account.role);
    return (
        <div className='App-container' id="App-container">
            <div className='App-content'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={false ? <PreLoad /> : <Header />}>
                            <Route index element={<Home />} />
                            <Route path='profile' element={<Profile />} />
                        </Route>
                        <Route path='/user' element={
                            <PrivateRoute role={role} name='user'>
                                <User />
                            </PrivateRoute>
                        } />
                        <Route path='/quiz/:id' element={<DetailQuiz />} />
                        <Route path='/admin' element={
                            <PrivateRoute role={role} name='admin'>
                                <Admin />
                            </PrivateRoute>
                        }>
                            <Route index element={<DashBoard />} />
                            <Route path='manage-users' element={<ManageUser />} />
                            <Route path='manage-quizzes' element={<ManageQuiz />} />
                            <Route path='manage-questions' element={<ManageQuestion />} />
                        </Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                    <ToastContainer
                        position='top-right'
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                    />
                </BrowserRouter>
                <ScrollButton />
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback="Loading...">
            <App />
        </Suspense>
    );
}

