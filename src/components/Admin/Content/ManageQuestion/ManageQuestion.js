import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import './ManageQuestion.scss';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion
} from '../../../../services/apiService';

function ManageQuestion() {
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
    const [questions, setQuestions] = useState(initQuestions);
    const [previewImage, setPreviewImage] = useState(false);
    const [urlImagePreview, setUrlImagePreview] = useState(initUrlImagePreview);

    useEffect(() => {
        fetchQuiz();
    }, []);

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
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
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

    const handleSubmitQuestionQuiz = async () => {
        //validate data
        if (!selectedQuiz.value) {
            toast.error('Please select a quiz!');
            return;
        }
        for (const question of questions) {
            let indexQ = questions.indexOf(question) + 1;
            if (!question.description) {
                toast.error(`Please fill in the question ${indexQ}`);
                return;
            }
            //submit answer
            for (const answer of question.answers) {
                let indexA = question.answers.indexOf(answer) + 1;
                if (!answer.description) {
                    toast.error(`Answer ${indexA} is empty at question ${indexQ}`);
                    return;
                }
            }
            let answerCorrect = question.answers.filter(answer => answer.isCorrect === true);
            if (answerCorrect.length === 0) {
                toast.error(`Choose the correct answer at question ${indexQ}`);
                return;
            }
        };
        //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description, answer.isCorrect, q.DT.id);
            }
        };
        toast.success('Create questions and answers succeed');
        //Reset
        setQuestions(initQuestions);
        setSelectedQuiz(initSelectedQuiz);
        setPreviewImage(false);
        setUrlImagePreview(initUrlImagePreview);
    };
    return (
        <div className='question-container' >
            <div className='question-title'>Questions Management</div>
            <hr />
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
                                            <Form.Label className='btn-upload' htmlFor={`${question.id}`}>
                                                <RiImageAddFill />
                                            </Form.Label>
                                            <Form.Control type='file' id={`${question.id}`} hidden
                                                onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                            />
                                            <div className='file-upload'>
                                                {question.imageName ?
                                                    <span
                                                        className='preview-image'
                                                        onClick={() => handlePreviewImage(question.id)}
                                                    >
                                                        {question.imageName}
                                                    </span>
                                                    :
                                                    '0 file is uploaded'}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className='img-preview-small'>
                                            {question.imageFile ? (
                                                <img className='image' src={question.imageFile ? URL.createObjectURL(question.imageFile) : ''} alt='' />
                                            ) : <div className='image'></div>}
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
                                                <Form.Check type='checkbox' checked={answer.isCorrect} className='iscorrect'
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className='description col-6 col'>
                                                    <FloatingLabel label={`Answer ${index + 1}`} className='mb-1'>
                                                        <Form.Control
                                                            className={answer.isCorrect && answer.description && 'is-valid'}
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
                        <Button variant="warning">Save question</Button>
                    </div>
                }
            </div>
        </div>
    );
}
export default ManageQuestion;
