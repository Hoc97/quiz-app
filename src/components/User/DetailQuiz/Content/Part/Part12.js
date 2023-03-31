import React from 'react';
import { tranferToAlphabet } from '../../../../../utils/commonFunction';
import ToeicTest from '../../../../../assets/ToeicTests/ToeicTest';
import CheckCorrect from '../IconCheck/CheckCorrect';
import CheckIncorrect from '../IconCheck/CheckIncorrect';
import QuestionResult from '../../../../../assets/ToeicTests/Practice_Tests/QuestionResult';
const Part12 = ({
    data,
    currentPart,
    handleCheckBox,
    index,
    isShowResultQuiz,
    isShowAnswer
}) => {
    const audio = ToeicTest.Practice_Tests[`Part${currentPart}`]?.audio?.[data.audio];
    const questionID = data.questionID;
    return (
        <>
            <div className='image'>
                {data.image ?
                    <img src={data.image ? `data:image/jpeg;base64,${data.image}` : ''} alt='' />
                    : ''
                }
            </div>
            {data.audio?.includes('.mp3') && (
                <div className='audio'>
                    <audio src={audio} controls="play"></audio>
                </div>
            )}
            <div className='question'>
                <span >Question {index + 1}:</span>
                <p className='question-detail'>{data.questionDescription}
                    {(isShowAnswer && +currentPart === 2) && QuestionResult[`Part${currentPart}`][questionID][3][0]}
                </p>
            </div>
            {data?.answers?.map((answer, i) => {
                let key = tranferToAlphabet(0, data?.answers.length - 1)[i];
                return (
                    <div key={i} className='answer'>
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
                                    <span>{QuestionResult[`Part${currentPart}`][questionID][i][0]}</span>
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
        </>
    );
};

export default Part12;