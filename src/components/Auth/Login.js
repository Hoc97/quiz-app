import { Link } from 'react-router-dom';
import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ImSpinner10 } from 'react-icons/im';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Headers } from '../../assets/img/Image';
import { validateEmail } from '../../utils/commonFunction';
import { handleQuickLogin } from '../common/handleCommon';
function Login() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        email: '',
        password: '',

    });
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setisShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleInput = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        //validate
        const isValidEmail = validateEmail(account.email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (!account.password) {
            toast.error('Invalid password');
            return;
        }

        //Call API
        setIsLoading(true);
        dispatch({
            type: 'POST_LOGIN',
            data: { email: account.email, password: account.password },
            navigate,
            setIsLoading
        });
    };


    return (
        <div className='login-container'>
            <div className='login-header'>
                <span>Bạn chưa có tài khoản?</span>
                <Link to={'/signup'} className='login-header-signup'>
                    <b style={{ color: '#384fa1' }}>Đăng ký</b>
                </Link>
                <a href='#a'>Cần giúp đỡ?</a>
            </div>
            <div className='login-content'>
                <div className='form'>
                    <div className='logo'>
                        <img src={Headers.logo} alt='' height={50} />
                    </div>

                    <h2 className='welcome'>Xin chào, ai đây nhỉ?</h2>
                    <div className='content'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Nhập email'
                                    name='email'
                                    value={account.email}
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group className='mb-4 password'>
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder='Nhập mật khẩu'
                                    name='password'
                                    value={account.password}
                                    onChange={handleInput}
                                />
                                {isShowPassword ? (
                                    <span className='eye' onClick={() => setisShowPassword(false)}>
                                        <AiFillEyeInvisible />
                                    </span>
                                ) : (
                                    <span className='eye' onClick={() => setisShowPassword(true)}>
                                        <AiFillEye />
                                    </span>
                                )}
                                <Form.Text className='text-password'>
                                    <a href='#a' >Quên mật khẩu?</a>
                                </Form.Text>
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='submit'
                                className='btn-login'
                                disabled={isLoading}
                                onClick={handleLogin}
                            >
                                {isLoading && <ImSpinner10 className='loaderIcon' />}
                                <span>Đăng nhập</span>
                            </Button>
                        </Form>
                        <div className='text' onClick={() => navigate('/')}>
                            <FaArrowCircleLeft /> Trở về trang chủ
                        </div>
                    </div>
                    <div className='quick-login'>
                        <hr />
                        <div className='mb-3 title'>Để đăng nhập nhanh bấm vào bên dưới... </div>
                        <Button variant="success me-3" onClick={() => handleQuickLogin('admin@gmail.com', '123456', setAccount)}>Admin</Button>
                        <Button variant="info" onClick={() => handleQuickLogin('user1@gmail.com', '123456', setAccount)}>User</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
