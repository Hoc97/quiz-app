import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import UserManage from './components/Admin/Content/UserManage';
import DashBoard from './components/Admin/Content/DashBoard';
import QuizManage from './components/Admin/Content/QuizManage';
import QuestionManage from './components/Admin/Content/QuestionManage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import DetailQuiz from './components/User/DetailQuiz';
import NotFound from './components/NotFound/NotFound';
function App() {
    return (
        <div className='App-container'>
            <div className='App-content'>
                <BrowserRouter>
                    <Routes>
                        {/* Phân bố route con tại vị trí này , phần động*/}
                        <Route path='/' element={<Home />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/quiz/:id' element={<DetailQuiz />} />
                        <Route path='/admin' element={<Admin />}>
                            <Route index element={<DashBoard />} />
                            <Route path='users-manage' element={<UserManage />} />
                            <Route path='quiz-manages' element={<QuizManage />} />
                            <Route path='questions-manages' element={<QuestionManage />} />
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
            </div>
        </div>
    );
}

export default App;
