import React from 'react';
import Form from 'react-bootstrap/Form';
import ToeicTest from '../../../../../assets/ToeicTests/ToeicTest';
const Part2 = ({
    data,
    currentPart,
    handleCheckBox,
    genCharArray,
    index,
    isShowResultQuiz
}) => {
    const audio = ToeicTest.Practice_Tests[`Part${currentPart}`]?.audio?.[data.audio];
    console.log(isShowResultQuiz);
    return (
        <>
            <div className='image'></div>
            {data.audio?.includes('.mp3') && (
                <div className='audio'>
                    <audio src={audio} controls="play"></audio>
                </div>
            )}
            <div className='question'>
                <span >Question {index + 1}:</span>
                <p className='question-detail'>{data.questionDescription}</p>
            </div>
            {data?.answers?.map((answer, index) => {
                let key = genCharArray(0, data?.answers.length - 1)[index];
                return (
                    <div key={index} className='answer'>

                        <Form>
                            <div className="form-check">
                                <label>
                                    <input
                                        disabled={isShowResultQuiz}
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={(e) => handleCheckBox(answer.id, data.questionID, e.target.checked)}
                                        checked={answer.isSelected}
                                    />
                                    <span
                                        style={isShowResultQuiz ? { cursor: "not-allowed" } : {}}
                                        className='label-text'>{key}</span>
                                </label>
                                <label className="form-check-label" >{answer.description}</label>
                            </div>
                        </Form>
                    </div >
                );
            })}
        </>
    );
};

export default Part2;