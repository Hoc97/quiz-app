import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiService';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Images from '../../assets/img/Image';
function SignUp() {
    const [account, setAccount] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [isShowPassword, setisShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

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
        //Call API

        let data = await postSignUp(account.email, account.password, account.username);
        if (data.EC === 0) {
            toast.success(data.EM);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            toast.error(data.EM);
        }
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
                        <img src={Images.Headers.logo} alt='' height={50} />
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
