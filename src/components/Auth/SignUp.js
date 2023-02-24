import './Auth.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiService';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isShowPassword, setisShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSignUp = async (e) => {
        e.preventDefault();

        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        //Call API

        let data = await postSignUp(email, password, username);
        console.log(data);
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
                <span>Alreade have an account?</span>
                <Link to='/login' className='signup-header-signup'>
                    Log in
                </Link>
            </div>
            <div className='signup-content'>
                <div className='form'>
                    <h2 className='logo'>HỌC ĐI CODE DẠO</h2>
                    <h2 className='welcome'>Start 's your journey ^^</h2>
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

                            <Form.Group className='mb-3 password'>
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
                            </Form.Group>
                            <Form.Group className='mb-4'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' className='btn-signup' onClick={handleSignUp}>
                                Create account
                            </Button>
                        </Form>
                        <div className='text' onClick={() => navigate('/')}>
                            &lt;&lt;Go to homepage
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
