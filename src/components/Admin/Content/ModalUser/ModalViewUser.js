import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import logoBg from '../../../assets/img/logo-react.svg';
import noImage from '../../../../assets/img/no image.jpg';
import './ModalUser.scss';
import _ from 'lodash';

function ModalViewUser({ show, setShow, userView }) {
    const handleClose = () => {
        setShow(false);
    };

    const [account, setAccount] = useState({
        email: '',
        username: '',
        role: '',
        image: '',
        previewImage: ''
    });
    useEffect(() => {
        if (!_.isEmpty(userView)) {
            //update state
            setAccount({
                email: userView.email,
                username: userView.username,
                role: userView.role,
                image: userView.image,
                previewImage: userView.image ? `data:image/jpeg;base64,${userView.image}` : noImage
            });
        }
    }, [userView]);


    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>View user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    disabled
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={account.email}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    disabled
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value='password'
                                />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    disabled
                                    placeholder='Username'
                                    name='username'
                                    value={account.username}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={account.role} disabled>
                                    <option value='USER'>USER</option>
                                    <option value='ADMIN'>ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;
