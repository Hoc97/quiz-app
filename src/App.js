import { Suspense, useEffect, useState, lazy } from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setCookie, getCookie } from './utils/commonFunction';
import TranstionPage from './assets/css/TranstionPage';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Preloader from './components/Preloader/Preloader';
const User = lazy(() => import('./components/User/User'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const ManageUser = lazy(() => import('./components/Admin/Content/ManageUser/ManageUser'));
const DashBoard = lazy(() => import('./components/Admin/Content/DashBoard'));
const ManageQuiz = lazy(() => import('./components/Admin/Content/ManageQuiz/ManageQuiz'));
const ManageQuestion = lazy(() => import('./components/Admin/Content/ManageQuestion/ManageQuestion'));
const Login = lazy(() => import('./components/Auth/Login'));
const SignUp = lazy(() => import('./components/Auth/SignUp'));
const DetailQuiz = lazy(() => import('./components/User/DetailQuiz/DetailQuiz'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));
const PrivateRoute = lazy(() => import('./routes/PrivateRoute'));
const ScrollButton = lazy(() => import('./components/ScrollButton/ScrollButton'));
const Profile = lazy(() => import('./components/Profile/Profile'));


function App() {
    let timerCookie = getCookie('Load');
    const [load, setLoad] = useState(!timerCookie);
    useEffect(() => {
        const handleOnload = () => {
            if (!timerCookie) {
                setTimeout(() => {
                    setLoad(false);
                }, 8000);
                setCookie('Load', 'load', 1);
            }
        };
        handleOnload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='App-container' id="App-container">
            <div className='App-content'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={load ? <TranstionPage /> : <Header />}>
                            <Route index element={<Home />} />
                            <Route path='profile' element={<Profile />} />
                        </Route>
                        <Route path='/user' element={
                            <PrivateRoute name='user'>
                                <User />
                            </PrivateRoute>
                        } />
                        <Route path='/quiz/:id' element={<DetailQuiz />} />
                        <Route path='/admin' element={
                            <PrivateRoute name='admin'>
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
        <Suspense fallback={<Preloader />}>
            <App />
        </Suspense>
    );
}

