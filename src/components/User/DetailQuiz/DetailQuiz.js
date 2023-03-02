import { useNavigate } from 'react-router-dom';
import './DetailQuiz.scss';
import ModalResult from './ModalResult';
import Content from './Content/Content';
import CheckMark from './CheckMark/CheckMark';
import { postSubmitQuiz, getDataQuestions } from '../../../services/apiService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
function DetailQuiz() {
    const navigate = useNavigate();
    const params = useParams();
    const quizId = params.id;
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

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
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionID: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            'quizId': +quizId,
            'answers': [],
        };
        let answers = [];
        if (dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionID;
                let userAnswerId = [];
                question.answers.forEach((answer) => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id);
                    }
                });
                answers.push({
                    'questionId': +questionId,
                    'userAnswerId': userAnswerId,
                });
            });
            payload.answers = answers;
        }
        //submit API
        let res = await postSubmitQuiz(payload);
        console.log(res);
        if (res.EC === 0) {
            setDataModal(res.DT);
            setIsShowModalResult(true);
            setCurrentQuestion(0);
        } else {
            alert('something wrong...');
        }
    };
    return (
        <>
            <div className='detail-quiz-container container'>
                <Content setDataModal={setDataModal}
                    setIsShowModalResult={setIsShowModalResult}
                    dataQuiz={dataQuiz}
                    setDataQuiz={setDataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
                <CheckMark
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setCurrentQuestion={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    setDataQuiz={setDataQuiz}

                />
            </div>
            <div className='container'>
                <div className='text-user' onClick={() => navigate('/user')}>
                    &#60;&#60;&#60; Back to your page
                </div>
            </div>
            <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} dataModal={dataModal} />
        </>
    );
}

export default DetailQuiz;
