import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import ManageUser from './components/Admin/Content/ManageUser/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageQuiz from './components/Admin/Content/ManageQuiz/ManageQuiz';
import ManageQuestion from './components/Admin/Content/ManageQuestion/ManageQuestion';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import DetailQuiz from './components/User/DetailQuiz/DetailQuiz';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './routes/PrivateRoute';
function App() {
    return (
        <div className='App-container'>
            <div className='App-content'>
                <BrowserRouter>
                    <Routes>
                        {/* Phân bố route con tại vị trí này , phần động*/}
                        <Route path='/' element={<Home />} />
                        <Route path='/user' element={
                            <PrivateRoute>
                                <User />
                            </PrivateRoute>
                        } />
                        <Route path='/quiz/:id' element={<DetailQuiz />} />
                        <Route path='/admin' element={
                            <PrivateRoute>
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
            </div>
        </div>
    );
}

export default App;
