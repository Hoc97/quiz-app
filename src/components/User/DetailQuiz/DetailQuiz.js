import { useNavigate } from 'react-router-dom';
import './DetailQuiz.scss';
import ModalResult from './ModalResult';
import Content from './Content/Content';
import CheckMark from './CheckMark/CheckMark';
import { postSubmitQuiz, getDataQuestions } from '../../../services/apiService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { handleStart } from '../../common/handleCommon';

function DetailQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const quizId = params.id;
    const listQuiz = useSelector(state => state.quizManage.listQuiz);
    const listTimerPart = useSelector(state => state.quizManage.listTimerPart);
    const getDetailQuiz = listQuiz.find(quiz => quiz.id === +quizId);
    const index = listQuiz.findIndex(quiz => quiz.id === +quizId);
    const TimerQuiz = useSelector(state => state.quizManage.listTimerQuiz[index]);
    const currentPart = getDetailQuiz?.order?.replace(/\D*/g, '');
    const [submissionResult, setSubmissionResult] = useState({
        numberCorrect: 0,
        numberIncorrect: 0,
        numberNotanswered: 0
    });
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [isShowResultQuiz, setIsShowResultQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const arrayIndexPara = dataQuiz.filter(item => item.paragraph).map(n => {
        const bb = dataQuiz.findIndex(i => i.questionID === n.questionID);
        return bb;
    });

    useEffect(() => {
        if (!dataQuiz.length) return;
        for (const question of dataQuiz) {
            for (const answer of question.answers) {
                if (answer.isSelected) {
                    window.onbeforeunload = function () {
                        return "Data will be lost if you leave the page, are you sure?";
                    };
                    break;
                }
            }
            break;
        }
        return () => {
            window.onbeforeunload = null;
        };
    }, [dataQuiz]);
    useEffect(() => {
        if (!TimerQuiz) {
            handleFinishQuiz();
            return;
        }
        let visibilitychange;
        Notification.requestPermission().then(function (permission) {
            let notification;
            if (permission !== 'granted') return;
            visibilitychange = () => {
                if (document.visibilityState === 'hidden') {
                    notification = new Notification('Vui lòng quay lại phòng thi', {
                        body: `Bạn đã rời khỏi phòng`,
                        tag: 'Come back'
                    });
                } else {
                    if (notification) notification.close();
                }
            };
            document.addEventListener('visibilitychange', visibilitychange);
        });

        return () => document.removeEventListener('visibilitychange', visibilitychange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TimerQuiz]);
    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizId]);
    const fetchQuestions = async () => {
        let res = await getDataQuestions(quizId);
        if (res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy('id')
                // `key` is group's name (id), `answers` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image;
                    let audio = '', paragraph = '';
                    value.forEach((item, index) => {
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                        image = item.image;
                        if (index !== 0) return;
                        const iDes = item.description;
                        const breakAudio = iDes.indexOf(';audio,');
                        const breakParagraph = iDes.indexOf(';reading_text,');
                        if (breakAudio > -1) {
                            audio = iDes.slice(breakAudio + 7);
                            questionDescription = iDes.slice(0, breakAudio);
                            return;
                        }
                        if (breakParagraph > -1) {
                            paragraph = iDes.slice(breakParagraph + 14);
                            questionDescription = iDes.slice(0, breakParagraph);
                            return;
                        }
                        questionDescription = iDes;
                    });
                    // sắp xếp thứ tự theo ID
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return {
                        questionID: key,
                        answers,
                        questionDescription,
                        image,
                        audio,
                        paragraph
                    };
                })
                .value();
            setDataQuiz(data);
            const [hours, minutes, seconds] = listTimerPart[`Part${currentPart}`];
            if (!getDetailQuiz.isInTimerRoom) {
                dispatch({ type: 'SET_TIMER_ROOM', payload: index });
                handleStart(hours, minutes, seconds, index, dispatch);
            }
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            'quizId': +quizId,
            'answers': [],
        };
        let answers = [];
        if (dataQuiz.length === 0) return;
        dataQuiz.forEach((question) => {
            let questionId = question.questionID;
            let userAnswerId = [];
            question.answers.forEach((answer) => {
                if (answer.isSelected) userAnswerId.push(answer.id);
            });
            answers.push({
                'questionId': +questionId,
                'userAnswerId': userAnswerId,
            });
        });
        payload.answers = answers;
        //submit API
        let res = await postSubmitQuiz(payload);
        if (res.EC !== 0) {
            alert('something wrong...');
            return;
        }
        dispatch({ type: 'SET_ISFINISH_QUIZ', payload: index });
        dispatch({ type: 'SET_TIMER_QUIZ', time: 0, payload: index });
        setDataModal(res.DT);
        setIsShowModalResult(true);
        setCurrentQuestion(0);
        if (+currentPart === 7) setIndexQuestion(0);
        let numberCorrect = 0;
        let numberIncorrect = 0;
        let numberNotanswered = 0;
        res.DT.quizData.forEach(item => {
            if (item.userAnswers.length === 0) {
                numberNotanswered++;
                return;
            }
            if (item.userAnswers[0] === item.systemAnswers[0].id) {
                numberCorrect++;
                return;
            }
            numberIncorrect++;
        });

        setSubmissionResult({ numberCorrect, numberIncorrect, numberNotanswered });
        let dataQuizClone = _.cloneDeep(dataQuiz);
        dataQuizClone.forEach(question => {
            let questionSystemId = res.DT.quizData.find(item => item.questionId === +question.questionID);
            let answerSystemId = questionSystemId.systemAnswers[0].id;
            question.answers.forEach(answer => {
                if (answer.id === answerSystemId) answer.isCorrect = true;
            });
        });
        setDataQuiz(dataQuizClone);
    };

    const handleShowResult = () => {
        setIsShowResultQuiz(true);
        setIsShowModalResult(false);
        setIsShowAnswer(true);
    };

    return (
        <div className={`detail-quiz-container ${+currentPart === 6 || +currentPart === 7 ? 'container-part6-7' : 'container'}`} >
            <div className='text-user' onClick={() => navigate('/user')}>
                <TiArrowBack style={{ marginTop: '-4px', marginRight: '5px', scale: '1.3' }} />
                Back
            </div>
            <div className={`detail-quiz`}>
                <Content
                    getDetailQuiz={getDetailQuiz}
                    dataQuiz={dataQuiz}
                    setDataQuiz={setDataQuiz}
                    setCurrentQuestion={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    currentPart={currentPart}
                    indexQuestion={indexQuestion}
                    arrayIndexPara={arrayIndexPara}
                    setIndexQuestion={setIndexQuestion}
                    isShowResultQuiz={isShowResultQuiz}
                    isShowAnswer={isShowAnswer}
                />
                <CheckMark
                    dataQuiz={dataQuiz}
                    setDataQuiz={setDataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setCurrentQuestion={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    currentPart={currentPart}
                    arrayIndexPara={arrayIndexPara}
                    setIndexQuestion={setIndexQuestion}
                    isShowResultQuiz={isShowResultQuiz}
                    isShowAnswer={isShowAnswer}
                    submissionResult={submissionResult}
                    indexQ={index}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModal={dataModal}
                handleShowResult={handleShowResult}
                setIsShowResultQuiz={setIsShowResultQuiz}
            />
        </div>
    );
}

export default DetailQuiz;
