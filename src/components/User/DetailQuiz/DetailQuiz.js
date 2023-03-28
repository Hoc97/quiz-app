import { useNavigate, useLocation } from 'react-router-dom';
import './DetailQuiz.scss';
import ModalResult from './ModalResult';
import Content from './Content/Content';
import CheckMark from './CheckMark/CheckMark';
import { postSubmitQuiz, getDataQuestions } from '../../../services/apiService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import _ from 'lodash';
function DetailQuiz() {
    const navigate = useNavigate();
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const currentPart = location?.state?.quizOrder;
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [isShowResultQuiz, setIsShowResultQuiz] = useState(false);

    const [dataModal, setDataModal] = useState({});
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const arrayIndexPara = dataQuiz.filter(item => item.paragraph).map(n => {
        const bb = dataQuiz.findIndex(i => i.questionID === n.questionID);
        return bb;
    });
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

    const handleShowResult = () => {
        setIsShowResultQuiz(true);
    };
    return (
        <div className={`detail-quiz-container ${+currentPart === 6 || +currentPart === 7 ? 'container-part6-7' : 'container'}`} >
            <div className='text-user' onClick={() => navigate('/user')}>
                <TiArrowBack style={{ marginTop: '-4px', marginRight: '5px', scale: '1.3' }} />
                Back
                {/* to your page */}
            </div>
            <div className={`detail-quiz`}>
                <Content setDataModal={setDataModal}
                    setIsShowModalResult={setIsShowModalResult}
                    dataQuiz={dataQuiz}
                    setDataQuiz={setDataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    currentPart={currentPart}
                    indexQuestion={indexQuestion}
                    setIndexQuestion={setIndexQuestion}
                    arrayIndexPara={arrayIndexPara}
                    isShowResultQuiz={isShowResultQuiz}
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
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModal={dataModal}
                handleShowResult={handleShowResult}
            />
        </div>
    );
}

export default DetailQuiz;
