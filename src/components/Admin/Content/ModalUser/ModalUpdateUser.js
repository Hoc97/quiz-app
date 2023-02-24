import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import logoBg from '../../../assets/img/logo-react.svg';
import noImage from '../../../../assets/img/no image.jpg';
import '../Content.scss';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../../services/apiService';
import _ from 'lodash';

function ModalUpdateUser({
    show,
    setShow,
    fetchListUsers,
    userUpdate,
    fetchListUsersPaginate,
    currentPage,
    setCurrentPage,
}) {
    const handleClose = () => {
        setShow(false);
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            //update state
            setEmail(userUpdate.email);
            setPassword(userUpdate.email);
            setUsername(userUpdate.username);
            setRole(userUpdate.role);
            if (userUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${userUpdate.image}`);
            } else {
                setPreviewImage(noImage);
            }
        }
    }, [userUpdate]);
    const handleUpload = (e) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            // setPreviewImage('');
        }
    };

    const handleSubmitUser = async () => {
        //validate
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
        let data = await putUpdateUser(userUpdate.id, password, username, role, image);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUsers();
            // setCurrentPage(1);
            await fetchListUsersPaginate(currentPage);
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
                    <Modal.Title>Update user</Modal.Title>
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
                                <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value='user'>User</option>
                                    <option value='admin'>Admin</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className='mb-3'>
                            <Form.Label className='label-upload' htmlFor='labelUpload'>
                                <FiUpload color='009688' size={20} />
                                Upload File Image
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

export default ModalUpdateUser;
