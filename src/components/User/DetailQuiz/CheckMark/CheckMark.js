import CountDown from './CountDown';
import { useRef, } from 'react';



function CheckMark({ dataQuiz, setDataQuiz, handleFinishQuiz, setCurrentQuestion, currentQuestion }) {
    const refDiv = useRef([]);

    const questionSelected = (question, index, currentQuestion) => {
        if (!question.answers.length) return '';
        let _class = '';
        let isUnAnswered = question.answers.every(answer => answer.isSelected === false);

        if (index === currentQuestion) {
            _class += ' clicked';
        }
        if (isUnAnswered === false) {
            _class += ' selected';
        }

        return _class.trim();
    };


    const handleClickQuestion = (index) => {
        setCurrentQuestion(index);
    };
    return (
        <div className='check-mark'>
            <div className='check-header'>
                <CountDown
                    handleFinishQuiz={handleFinishQuiz}
                    setCurrentQuestion={setCurrentQuestion}
                    dataQuiz={dataQuiz}
                    setDataQuiz={setDataQuiz}
                />
            </div>
            <div className='list-mark'>
                <div className='list'>
                    {dataQuiz.length > 0 && dataQuiz.map((question, index) => {
                        return (
                            <div
                                key={index}
                                className='mark-answer'
                                onClick={() => handleClickQuestion(index)}

                            >
                                <span
                                    className={`number-detail ${questionSelected(question, index, currentQuestion)} `}
                                    ref={element => refDiv.current[index] = element}
                                >
                                    {index + 1}
                                </span>
                            </div>
                        );
                    })}
                </div >


            </div >
            <div className='note'>
                <h4>Note:</h4>
                <p>
                    <span className='note-number answered'>1</span>
                    <span>Answered</span>
                </p>
                <p>
                    <span className='note-number isfocusing '>1</span>
                    <span>Is Focusing</span>
                </p>
                <p>
                    <span className='note-number notselected'>1</span>
                    <span>Not Selected</span>
                </p>
            </div>
        </div >
    );
};

export default CheckMark;;;