import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import logoBg from '../../../assets/img/logo-react.svg';
import './ModalUser.scss';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../../services/apiService';

function ModalCreateUser({ show, setShow, fetchListUsers, fetchListUsersPaginate, currentPage, setCurrentPage }) {
    const handleClose = () => {
        setShow(false);
        setAccount({
            email: '',
            password: '',
            username: '',
            role: 'USER',
            image: '',
            previewImage: ''
        });
    };

    const [account, setAccount] = useState({
        email: '',
        password: '',
        username: '',
        role: 'USER',
        image: '',
        previewImage: ''
    });

    const handleInput = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            setAccount({
                ...account,
                previewImage: URL.createObjectURL(e.target.files[0]),
                image: e.target.files[0]
            });
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCreateUser = async () => {
        //validate
        const isValidEmail = validateEmail(account.email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (!account.password) {
            toast.error('Invalid Password');
            return;
        }
        if (!account.username) {
            toast.error('Invalid Username');
            return;
        }

        //call API
        // Bên axiosCustom phần interceptor return response.data rồi nên nó sẽ lấy đc data lun
        let data = await postCreateNewUser(account.email, account.password, account.username, account.role, account.image);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUsers();
            setCurrentPage(1);
            await fetchListUsersPaginate(1);
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={account.email}
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={account.password}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder='Username'
                                    name='username'
                                    value={account.username}
                                    onChange={handleInput}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={account.role} onChange={handleInput} name='role'>
                                    <option value='USER'>USER</option>
                                    <option value='ADMIN'>ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className='mb-3'>
                            <Form.Label className='label-upload' htmlFor='labelUpload'>
                                <FiUpload color='009688' size={20} />
                                Upload Image
                            </Form.Label>
                            <Form.Control type='file' id='labelUpload' hidden onChange={handleUpload} />
                        </Form.Group>
                        <Form.Group className='mb-3 img-preview'>
                            {account.previewImage ? (
                                <img className='image' src={account.previewImage} alt='' />
                            ) : (
                                <span>Preview Image</span>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;
