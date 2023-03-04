import Question from './Question';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

function Content({ dataQuiz, setDataQuiz, handleFinishQuiz, currentQuestion, setCurrentQuestion }) {
    console.log('dataQuiz', dataQuiz);
    const location = useLocation();
    const params = useParams();
    const quizId = params.id;
    const handleDown = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    const handleUp = () => {
        if (currentQuestion < (dataQuiz.length - 1)) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleCheckBox = (answerID, questionID, checked) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item) => +item.questionID === +questionID);
        if (question && question.answers) {
            question.answers.map((item) => {
                if (+item.id === +answerID) {
                    item.isSelected = checked;
                }
                return item;
            });
        }
        setDataQuiz(dataQuizClone);
    };


    return (
        <div className='content'>
            <h2>
                Quiz {quizId}: {location?.state?.quizTitle}
            </h2>
            <hr />
            <div className='part-group'>
                <div className='part-detail'>Part 1</div>
                <div className='part-detail'>Part 2</div>
                <div className='part-detail'>Part 3</div>
                <div className='part-detail'>Part 4</div>
                <div className='part-detail'>Part 5</div>
            </div>
            <p className='description'>
                Look at the picture. Choose the sentence that best describes the picture:
            </p>

            <Question
                handleCheckBox={handleCheckBox}
                index={currentQuestion}
                data={dataQuiz.length > 0 ? dataQuiz[currentQuestion] : {}}
            />
            <hr />
            <div className='move-page'>
                <button
                    className='move-button'
                    disabled={currentQuestion === 0 ? true : false}
                    style={{ opacity: currentQuestion === 0 ? 0 : 1 }}
                    onClick={handleDown}
                >
                    <span className='move-icon'><BsFillArrowLeftCircleFill /></span>
                    <span>BACK</span>
                </button>
                <button
                    className='move-button'
                    disabled={currentQuestion === (dataQuiz.length - 1) ? true : false}
                    style={{ opacity: currentQuestion === (dataQuiz.length - 1) ? 0 : 1 }}
                    onClick={handleUp}
                >
                    <span>NEXT</span>
                    <span className='move-icon'><BsFillArrowRightCircleFill /></span>
                </button>
            </div>
        </div>
    );
}

export default Content;