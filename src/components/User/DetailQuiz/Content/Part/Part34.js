import React from 'react';
import { tranferToAlphabet } from '../../../../../utils/commonFunction';
import ToeicTest from '../../../../../assets/ToeicTests/ToeicTest';
import CheckCorrect from '../IconCheck/CheckCorrect';
import CheckIncorrect from '../IconCheck/CheckIncorrect';
import QuestionResult from '../../../../../assets/ToeicTests/Practice_Tests/QuestionResult';
const Part34 = ({
    listData,
    currentPart,
    handleCheckBox,
    index,
    isShowResultQuiz,
    isShowAnswer
}) => {
    const audio = ToeicTest.Practice_Tests[`Part${currentPart}`]?.audio?.[listData[0].audio];
    const indexData = index - (index % 3);
    // console.log('indexData', indexData, listData);
    const questionID = listData[0].questionID;
    return (
        <>
            <div style={+currentPart === 4 ? { display: 'flex' } : {}}>
                {listData[0].audio?.includes('.mp3') && (
                    <div className='audio' style={+currentPart === 4 ? { marginTop: '30px' } : {}}>
                        <audio src={audio} controls="play"></audio>
                    </div>
                )}
                {+currentPart === 4 &&
                    <div className={listData[0].image ? 'image' : ''}>{listData[0].image ?
                        <img
                            src={`data:image/jpeg;base64,${listData[0].image}`} alt='' />
                        : ''}
                    </div>
                }
            </div>
            {isShowAnswer &&
                <div>{QuestionResult[`Part${currentPart}`][questionID][0]}</div>
            }
            {listData.length > 0 &&
                listData.map((data, i) => {
                    return (
                        <div key={i} >
                            <div className='question'>
                                <span >Question {i + indexData + 1}:</span>
                                <p className='question-detail'>{data.questionDescription}</p>
                            </div>
                            {
                                data?.answers?.map((answer, n) => {
                                    let key = tranferToAlphabet(0, data?.answers.length - 1)[n];
                                    return (
                                        <div key={n} className='answer'>
                                            <div className="form-check">
                                                <label>
                                                    <input
                                                        disabled={isShowResultQuiz}
                                                        type="radio" name={`flexRadio${data?.questionID}`}
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
                                })
                            }
                            {isShowAnswer &&
                                <span>{QuestionResult[`Part${currentPart}`][listData[i].questionID][2]}</span>}
                        </div>
                    );
                })
            }
        </>
    );
};

export default Part34;