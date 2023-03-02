import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import UpdateQAQuiz from './UpdateQAQuiz';
import AssignQuiz from './AssignQuiz';

function ManageQuiz() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState({ value: '', label: 'Select level...' });
    const [image, setImage] = useState(null);
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const handleChange = (selectedOption) => {
        setType(selectedOption);
    };

    const handleFile = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }
        if (!type.value) {
            toast.error('Level is required');
            return;
        }
        let res = await postCreateNewQuiz(description, name, type.value, image);
        if (res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setType({ value: '', label: 'Select level...' });
            setImage(null);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className='quiz-container'>
            <Accordion >
                <Accordion.Item eventKey='0' className='mb-2'>
                    <Accordion.Header>Quizzes Management</Accordion.Header>
                    <Accordion.Body>
                        <div className='quiz-add'>
                            <div className='add-quizzes'>1. Add new quiz </div>
                            <div className='form-add mt-2'>
                                <FloatingLabel label='Name' className='mb-3'>
                                    <Form.Control
                                        type='text'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder='name@example.com'
                                    />
                                </FloatingLabel>
                                <FloatingLabel label='Description' className='mb-3'>
                                    <Form.Control
                                        type='text'
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        placeholder='Password'
                                    />
                                </FloatingLabel>
                                <Form.Group className='my-3 more-actions'>
                                    <Form.Label className=''>Level</Form.Label>
                                    <Select
                                        value={type}
                                        onChange={handleChange}
                                        options={options} placeholder='Quiz type' />
                                </Form.Group>
                                <Form.Group className='mb-3 upload-file'>
                                    <Form.Label className=''> Upload file</Form.Label>
                                    <Form.Control type='file' onChange={handleFile} />
                                </Form.Group>
                                <div className='btn-submit-quiz'>
                                    <Button variant='warning' className='float-end px-4 ' onClick={handleSubmitQuiz}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='quiz-list-detail'>
                            <div className='list-quizzes'>2. List Quizzes </div>
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1' className='mb-2' >
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <UpdateQAQuiz />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2' className='mb-2'>
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    );
}

export default ManageQuiz;
