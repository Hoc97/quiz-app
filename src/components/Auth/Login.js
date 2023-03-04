import { Link } from 'react-router-dom';
import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getDataLogin } from '../../redux/action/action';
import { ImSpinner10 } from 'react-icons/im';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Languages from '../Languages/Languages';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setisShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        //Call API

        setIsLoading(true);

        let data = await postLogin(email, password);
        console.log(data);

        if (data.EC === 0) {
            dispatch(getDataLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        } else {
            toast.error(data.EM);
            setIsLoading(false);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-header'>
                <span>Don't have an account yet?</span>
                <Link to={'/signup'} className='login-header-signup'>
                    Sign up
                </Link>
                <a href='#a'>Need help?</a>
                <Languages />
            </div>
            <div className='login-content'>
                <div className='form'>
                    <h2 className='logo'>HỌC ĐI CODE DẠO</h2>
                    <h2 className='welcome'>Hello, who's this?</h2>
                    <div className='content'>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='mb-4 password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    <a href='#a'>Forgot password?</a>
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
                                <span>Login</span>
                            </Button>
                        </Form>
                        <div className='text' onClick={() => navigate('/')}>
                            &lt;&lt;&lt; Go to homepage
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
