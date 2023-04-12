import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableQuiz from './TableQuiz';
import { useRef, useState } from 'react';
import { postCreateNewQuiz } from '../../../../../services/apiService';
import { toast } from 'react-toastify';
import { RiImageAddFill } from 'react-icons/ri';
function EditQuiz() {
    const tableRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [query, setQuery] = useState('');

    const handleUploadFile = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        e.target.value = '';
    };

    const handleUpdateTableQuiz = () => {
        tableRef.current.fetchQuiz();
    };

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }
        if (!image) {
            toast.error('Image is required');
            return;
        }

        let res = await postCreateNewQuiz(name, description, 'EASY', image);
        if (res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
            handleUpdateTableQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <div className='quiz-add'>
                <div className='add-quizzes'>Add new quiz </div>
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

                    <div className='d-flex align-items-center'>
                        <Form.Group className='upload-image'>
                            <Form.Label className='btn-upload' htmlFor='UploadImageQuiz'>
                                <RiImageAddFill />
                            </Form.Label>
                            <Form.Control type='file' id='UploadImageQuiz' hidden
                                onChange={(e) => handleUploadFile(e)}
                            />
                            <div className='file-upload'>
                                {image ?
                                    <span
                                        className='preview-image'
                                    >
                                        {image.name}
                                    </span>
                                    :
                                    '0 file is uploaded'}
                            </div>
                        </Form.Group>
                        <Form.Group className='img-preview-small'>
                            {image ? (
                                <img className='image' src={image ? URL.createObjectURL(image) : ''} alt='' />
                            ) : <div className='image'></div>}
                        </Form.Group>
                    </div>
                    <Form.Group className='mb-3 upload-file'>
                    </Form.Group>
                    <div className='btn-submit-quiz text-end'>
                        <Button variant='warning' className=' px-4 ' onClick={handleSubmitQuiz}>
                            Saves
                        </Button>
                    </div>
                </div>
            </div>
            <div className='seperate'>
                <hr />
            </div>
            <div className='quiz-list-detail'>
                <div className='list-quizzes'>List Quizzes </div>
                <input type='text' placeholder='Search...' className='search mb-2'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <TableQuiz tableRef={tableRef} query={query} />
            </div>
        </>
    );
}

export default EditQuiz;