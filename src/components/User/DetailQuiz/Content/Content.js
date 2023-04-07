import Question from './Question';
import _ from 'lodash';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

function Content({
    getDetailQuiz,
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
                {getDetailQuiz?.title && `${getDetailQuiz?.title}: ${getDetailQuiz?.description}`}
            </h2>
            <hr />
            <p className='description'>
                Chọn câu trả lời với mô tả đúng nhất
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