import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Headers } from '../../assets/img/Image';
import { validateEmail } from '../../utils/commonFunction';
import { useDispatch } from 'react-redux';
function SignUp() {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [isShowPassword, setisShowPassword] = useState(false);
    const navigate = useNavigate();



    const handleInput = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };
    const handleSignUp = async (e) => {
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
        if (!account.username) {
            toast.error('Invalid user');
            return;
        }
        //Call API
        dispatch({
            type: 'POST_SIGN_UP',
            data: { email: account.email, password: account.password, username: account.username },
            navigate
        });
    };
    return (
        <div className='signup-container'>
            <div className='signup-header'>
                <span>Bạn đã có sẵn tài khoản?</span>
                <Link to='/login' className='signup-header-signup'>
                    <b style={{ color: '#384fa1' }}> Đăng nhập</b>
                </Link>
            </div>
            <div className='signup-content'>
                <div className='form'>
                    <div className='logo'>
                        <img src={Headers.logo} alt='' height={50} />
                    </div>
                    <h2 className='welcome'>Bắt đầu hành trình của bạn</h2>
                    <div className='content'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Nhập email'
                                    name='email'
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3 password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder='Nhập mật khẩu'
                                    name='password'
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
                            </Form.Group>
                            <Form.Group className='mb-4'>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='username'
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' className='btn-signup' onClick={handleSignUp}>
                                Tạo tài khoản
                            </Button>
                        </Form>
                        <div className='text' onClick={() => navigate('/')}>
                            <FaArrowCircleLeft /> Trở về trang chủ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
