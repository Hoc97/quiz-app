import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import noImage from '../../../../../../assets/img/no image.jpg';
import './ModalQuiz.scss';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../../../services/apiService';
import _ from 'lodash';

function ModalUpdateQuiz({
    show,
    setShow,
    fetchQuiz,
    userUpdate,

}) {
    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            //update state
            setQuiz({
                name: userUpdate.name,
                description: userUpdate.description,
                quizImage: userUpdate.image,
                previewImage: userUpdate.image ? `data:image/jpeg;base64,${userUpdate.image}` : noImage
            });
        }
    }, [userUpdate]);

    const [quiz, setQuiz] = useState({
        name: '',
        description: '',
        quizImage: '',
        previewImage: ''
    });

    const handleInput = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            setQuiz({
                ...quiz,
                previewImage: URL.createObjectURL(e.target.files[0]),
                quizImage: e.target.files[0]
            });
        }
    };

    const handleUpdateQuiz = async () => {
        //validate
        if (!quiz.name) {
            toast.error('Invalid Name');
            return;
        }

        if (!quiz.description) {
            toast.error('Invalid Description');
            return;
        }

        //call API
        let data = await putUpdateQuiz(userUpdate.id, quiz.description, quiz.name, 'EASY', quiz.quizImage);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchQuiz();
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop='static' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Update quiz {userUpdate.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    placeholder='Enter description'
                                    name='description'
                                    value={quiz.description}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    placeholder='Enter name'
                                    name='name'
                                    value={quiz.name}
                                    onChange={handleInput}
                                />
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
                            {quiz.previewImage ? (
                                <img className='image' src={quiz.previewImage} alt='' />
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
                    <Button variant='primary'
                        onClick={handleUpdateQuiz}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;
