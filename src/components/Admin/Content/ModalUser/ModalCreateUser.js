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
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('user');
        setImage('');
        setPreviewImage('');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const handleUpload = (e) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setPreviewImage('');
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (!password) {
            toast.error('Invalid Password');
            return;
        }
        if (!username) {
            toast.error('Invalid Username');
            return;
        }

        //call API
        // Bên axiosCustom phần interceptor return response.data rồi nên nó sẽ lấy đc data lun
        let data = await postCreateNewUser(email, password, username, role, image);
        console.log(data);
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
            {/* <Button variant='primary' onClick={handleShow}>
                Launch demo modal
            </Button> */}

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
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
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value='user'>User</option>
                                    <option value='admin'>Admin</option>
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
                            {previewImage ? (
                                <img className='image' src={previewImage} alt='' />
                            ) : (
                                <span>Preview Image</span>
                            )}
                        </Form.Group>
                        <label>
                            <input type="checkbox" />
                            <span className="label">Check me</span>
                        </label>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleSubmitUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;
