import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import noImage from '../../../../assets/img/no image.jpg';
import './ModalUser.scss';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../../services/apiService';
import _ from 'lodash';

function ModalUpdateUser({
    show,
    setShow,
    userUpdate,
    fetchListUsersPaginate,
    currentPage,
}) {
    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            setAccount({
                email: userUpdate.email,
                username: userUpdate.username,
                role: userUpdate.role,
                image: userUpdate.image,
                previewImage: userUpdate.image ? `data:image/jpeg;base64,${userUpdate.image}` : noImage
            });
        }
    }, [userUpdate]);

    const [account, setAccount] = useState({
        email: '',
        username: '',
        role: '',
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

    const handleUpdatetUser = async () => {
        //validate
        if (!account.username) {
            toast.error('Invalid Username');
            return;
        }

        //call API
        let data = await putUpdateUser(userUpdate.id, account.username, account.role, account.image);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsersPaginate(currentPage);
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>
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
                                    name='email'
                                    value={account.email}
                                    onChange={handleInput}
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
                                Upload File Image
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
                    <Button variant='primary' onClick={handleUpdatetUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;
