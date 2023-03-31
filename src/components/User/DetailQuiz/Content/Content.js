import Question from './Question';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

function Content({
    dataQuiz,
    setDataQuiz,
    currentQuestion,
    setCurrentQuestion,
    indexQuestion,
    setIndexQuestion,
    currentPart,
    arrayIndexPara,
    isShowResultQuiz,
    isShowAnswer
}) {
    // console.log('data', dataQuiz);
    const location = useLocation();
    const handleDown = () => {
        if (currentQuestion <= 0) return;
        if (+currentPart === 1 || +currentPart === 2 || +currentPart === 5) setCurrentQuestion(currentQuestion - 1);
        if (+currentPart === 3 || +currentPart === 4 || +currentPart === 6) setCurrentQuestion(currentQuestion => {
            if (currentQuestion - 3 >= 0) return currentQuestion = currentQuestion - 3;
            return currentQuestion = 0;
        });
        if (+currentPart === 7) {
            if (indexQuestion - 1 >= 0) {
                setCurrentQuestion(arrayIndexPara[indexQuestion - 1]);
                setIndexQuestion(indexQuestion - 1);
                return;
            }
            setCurrentQuestion(0);
            setIndexQuestion(0);
        }
    };

    const handleUp = () => {
        if (currentQuestion >= (dataQuiz.length - 1)) return;
        if (+currentPart === 1 || +currentPart === 2 || +currentPart === 5) setCurrentQuestion(currentQuestion + 1);
        if (+currentPart === 3 || +currentPart === 4 || +currentPart === 6) setCurrentQuestion(currentQuestion => {
            if (currentQuestion + 3 <= (dataQuiz.length - 1)) return currentQuestion = currentQuestion + 3;
            return currentQuestion = dataQuiz.length - 1;
        });
        if (+currentPart === 7) {
            if (indexQuestion + 1 <= arrayIndexPara.length - 1) {
                setCurrentQuestion(arrayIndexPara[indexQuestion + 1]);
                setIndexQuestion(indexQuestion + 1);
                return;
            }
            setCurrentQuestion(dataQuiz.length - 1);
            setIndexQuestion(arrayIndexPara.length - 1);
        }
    };

    const handleCheckBox = (answerID, questionID, checked) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item) => +item.questionID === +questionID);
        if (question && question.answers) {
            question.answers.map((item) => {
                item.isSelected = false;
                if (+item.id === +answerID) item.isSelected = checked;
                return item;
            });
        }
        setDataQuiz(dataQuizClone);
    };

    let dataQuestion = {};
    if (dataQuiz.length > 0) {
        if (+currentPart === 1 || +currentPart === 2 || +currentPart === 5) dataQuestion = dataQuiz[currentQuestion];
        if (+currentPart === 3 || +currentPart === 4 || +currentPart === 6)
            dataQuestion = dataQuiz.slice(currentQuestion - (currentQuestion % 3), currentQuestion + 3 - (currentQuestion % 3));
        if (+currentPart === 7)
            dataQuestion = dataQuiz.slice(arrayIndexPara[indexQuestion], arrayIndexPara[indexQuestion + 1]);
    }
    return (
        <div className='content'>
            <h2>
                {location?.state?.quizTitle && `${location?.state?.quizTitle}: ${location?.state?.quizDescription}`}
            </h2>
            <hr />
            {/* <div className='part-group'>
                <div className='part-detail'>Part 1</div>
                <div className='part-detail'>Part 2</div>
                <div className='part-detail'>Part 3</div>
                <div className='part-detail'>Part 4</div>
                <div className='part-detail'>Part 5</div>
            </div> */}
            <p className='description'>
                Choose the answer that best describes
            </p>
            <Question
                handleCheckBox={handleCheckBox}
                index={+currentPart === 7 ? arrayIndexPara[indexQuestion] : currentQuestion}
                data={dataQuestion}
                currentPart={currentPart}
                isShowResultQuiz={isShowResultQuiz}
                isShowAnswer={isShowAnswer}
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