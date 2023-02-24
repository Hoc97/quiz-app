import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import logoBg from '../../../assets/img/logo-react.svg';
import noImage from '../../../../assets/img/no image.jpg';
import '../Content.scss';
import _ from 'lodash';

function ModalViewUser({ show, setShow, userView }) {
    const handleClose = () => {
        setShow(false);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
        // console.log('effect');
        if (!_.isEmpty(userView)) {
            //update state
            setEmail(userView.email);
            setPassword(userView.email);
            setUsername(userView.username);
            setRole(userView.role);
            if (userView.image) {
                setPreviewImage(`data:image/jpeg;base64,${userView.image}`);
            } else {
                setPreviewImage(noImage);
            }
        }
    }, [userView]);
    // console.log('render');

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    disabled
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    disabled
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} disabled>
                                    <option value='user'>User</option>
                                    <option value='admin'>Admin</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group className='mb-3 img-preview'>
                            {previewImage ? (
                                <img className='image' src={previewImage} alt='' />
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
