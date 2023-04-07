import { useState, useEffect } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './UpdateQAQuiz.scss';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { FaRegFileAudio } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA
} from '../../../../../services/apiService';
import { urltoFile } from '../../../../../utils/commonFunction';

function UpdateQAQuiz() {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];
    const initUrlImagePreview = {
        title: '',
        url: ''
    };
    const initSelectedQuiz = { value: '', label: 'Select quiz...' };

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(initSelectedQuiz);
    const [previewImage, setPreviewImage] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [questions, setQuestions] = useState(initQuestions);
    const [urlImagePreview, setUrlImagePreview] = useState(initUrlImagePreview);
    useEffect(() => {
        fetchQuiz();
    }, []);
    useEffect(() => {
        if (selectedQuiz.value) {
            fetchQuizWithQA();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedQuiz]);

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res.EC === 0) {
            //convert base64 to file object
            let newQA = [];

            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.description.indexOf(';audio,') > -1) {
                    q.audioName = q.description.slice(q.description.indexOf(';audio,') + 7);
                    q.description = q.description.slice(0, q.description.indexOf(';audio,'));
                }
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
                }
                newQA.push(q);
            }
            setQuestions(res.DT.qa);
        }
    };
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            const newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((n) => {
                return n.id !== id;
            });
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionsClone.findIndex((item) => item.id === questionId);
            let answers = questionsClone[index].answers;
            questionsClone[index].answers = [...answers, newAnswer];
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex((item) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== answerId);
            setQuestions(questionsClone);
        }
    };

    const handleChange = (selectedOption) => {
        setSelectedQuiz(selectedOption);
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex((item) => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            event.target.value = null;
            setQuestions(questionsClone);
        }
    };

    const handleOnChangeFileQuestionAudio = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target.files[0]) {
            questionsClone[index].audioName = event.target.files[0].name;
            event.target.value = null;
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    answer.isCorrect = false;
                    if (answer.id === answerId) {
                        if (type === 'RADIO') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                });

            setQuestions(questionsClone);
        }
    };

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setUrlImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            });
            setPreviewImage(true);
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmitQuestionQuiz = async () => {
        //validate data
        if (!selectedQuiz.value) {
            toast.error('Please select a quiz!');
            return;
        }
        for (const question of questions) {
            let indexQ = questions.indexOf(question) + 1;
            // Đang làm phần audio tạm thời ko validate phần này
            // if (!question.description) {
            //     toast.error(`Please fill in the question ${indexQ}`);
            //     return;
            // }
            // for (const answer of question.answers) {
            //     let indexA = question.answers.indexOf(answer) + 1;
            //     if (!answer.description) {
            //         toast.error(`Answer ${indexA} is empty at question ${indexQ}`);
            //         return;
            //     }
            // }
            let answerCorrect = question.answers.filter(answer => answer.isCorrect === true);
            if (answerCorrect.length === 0) {
                toast.error(`Choose the correct answer at question ${indexQ}`);
                return;
            }
        };
        // convert file object to base64 javascript
        let questionsClone = _.cloneDeep(questions);

        for (const question of questionsClone) {
            if (question.audioName) {
                question.description = question.description + `;audio,${question.audioName}`;
            }
            if (question.imageFile) {
                question.imageFile = await toBase64(question.imageFile);
            }
        }
        //Post update API Quiz QA 
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        if (res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        }

    };


    return (
        <div className='question-container' >
            <div className='question-add'>
                <div className='mb-3 col-6'>
                    <Form.Label>Select quiz:</Form.Label>
                    <Select
                        value={selectedQuiz}
                        onChange={handleChange}
                        options={listQuiz}
                        placeholder="Question type"
                    />
                </div>
                <div>Add question:</div>
                {questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={index} className='q-main'>
                                <div className='question-content row'>
                                    <div className='description col-6'>
                                        <FloatingLabel label={`Question description ${index + 1}`} className='mb-1'>
                                            <Form.Control
                                                type='text'
                                                onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)}
                                                value={question.description}
                                                placeholder='Description'
                                            />
                                        </FloatingLabel>
                                    </div>
                                    <div className='question-upload-image col'>
                                        <Form.Group className='upload-image'>
                                            {/* Upload audio */}
                                            <Form.Label className='btn-upload' htmlFor={`${question.id}-audio`}>
                                                <FaRegFileAudio />
                                            </Form.Label>

                                            <div className='file-upload'>
                                                {question.audioName ?
                                                    <span className='preview-image'>
                                                        {question.audioName}
                                                    </span>
                                                    :
                                                    '0 audio is uploaded'}
                                            </div>
                                            <Form.Control type='file' id={`${question.id}-audio`} hidden
                                                onChange={(e) => handleOnChangeFileQuestionAudio(question.id, e)}
                                            />
                                            {/* Upload image */}
                                            <Form.Label className='btn-upload' htmlFor={`${question.id}`}>
                                                <RiImageAddFill />
                                            </Form.Label>

                                            <div className='file-upload'>
                                                {question.imageName ?
                                                    <span className='preview-image'
                                                        onClick={() =>
                                                            handlePreviewImage(question.id)}>{question.imageName}
                                                    </span>
                                                    :
                                                    '0 image is uploaded'}
                                            </div>
                                            <Form.Control type='file' id={`${question.id}`} hidden
                                                onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                            />
                                        </Form.Group>
                                        <Form.Group className='img-preview-small'>
                                            {showImage ? (
                                                <img className='image' src={previewImage} alt='' />
                                            ) : previewImage ? (
                                                <span className='previewImage' onClick={() => setShowImage(true)}>
                                                    Preview Image
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </Form.Group>
                                        <div className='btn-add'>
                                            <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                                <BsFillPatchPlusFill className='icon-add' />
                                            </span>
                                            {questions.length > 1 && (
                                                <span
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                    <BsFillPatchMinusFill className='icon-remove' />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {question?.answers?.length > 0 &&
                                    question?.answers?.map((answer, index) => {
                                        return (
                                            <div key={index} className='answers-content'>
                                                <Form.Check type='radio' checked={answer.isCorrect} className='iscorrect' name={`${question?.id}`}
                                                    onChange={(e) => handleAnswerQuestion('RADIO', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className='description col-6 col'>
                                                    <FloatingLabel label={`Answer ${index + 1}`} className='mb-1'>
                                                        <Form.Control
                                                            className={answer.isCorrect && 'is-valid'}
                                                            type='text'
                                                            onChange={(e) => handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value)}
                                                            value={answer.description}
                                                            placeholder='Description'
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                                <div className='btn-add'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                            }
                                                        >
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                            </div>
                        );
                    })}
                {previewImage &&
                    <Lightbox
                        image={urlImagePreview.url}
                        title={urlImagePreview.title}
                        onClose={() => setPreviewImage(false)}
                    >
                    </Lightbox>}
                {questions.length > 0 &&
                    <div className='text-end' onClick={() => handleSubmitQuestionQuiz()}>
                        <Button variant="warning ">Update question</Button>
                    </div>
                }
            </div>
        </div>
    );
}
export default UpdateQAQuiz;
