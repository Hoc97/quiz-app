import { tranferToAlphabet } from '../../../../../utils/commonFunction';
import CheckCorrect from '../IconCheck/CheckCorrect';
import CheckIncorrect from '../IconCheck/CheckIncorrect';
import QuestionResult from '../../../../../assets/ToeicTests/Practice_Tests/QuestionResult';
const Part5 = ({
    data,
    handleCheckBox,
    index,
    isShowResultQuiz,
    isShowAnswer,
    currentPart
}) => {
    const questionID = data.questionID;
    return (
        <>
            <div className='image'></div>
            <div className='question'>
                <span >Question {index + 1}:</span>
                <p className='question-detail'>{data.questionDescription}</p>
            </div>
            {data?.answers?.map((answer, index) => {
                let key = tranferToAlphabet(0, data?.answers.length - 1)[index];
                return (
                    <div key={index} className='answer'>
                        <div className="form-check">
                            <label>
                                <input
                                    disabled={isShowResultQuiz}
                                    type="radio" name="flexRadioDefault"
                                    className="form-check-input"
                                    onChange={(e) => handleCheckBox(answer.id, data.questionID, e.target.checked)}
                                    checked={answer.isSelected}
                                />
                                <span style={isShowResultQuiz ? { cursor: "not-allowed" } : {}} className='label-text'>{key}</span>
                            </label>
                            <label className="form-check-label" >{answer.description}</label>
                            {isShowAnswer &&
                                <>
                                    {answer.isSelected ?
                                        (answer.isSelected === answer.isCorrect ? <CheckCorrect /> : <CheckIncorrect />)
                                        : answer.isCorrect && <CheckCorrect />
                                    }
                                </>
                            }
                        </div>
                    </div >
                );
            })}
            {isShowAnswer &&
                <div className='group-content-result-question'
                    dangerouslySetInnerHTML={{ __html: QuestionResult[`Part${currentPart}`][questionID][1] }}
                />
            }
        </>
    );
};

export default Part5;