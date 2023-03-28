import React from 'react';
import Form from 'react-bootstrap/Form';
import ToeicTest from '../../../../../assets/ToeicTests/ToeicTest';
const Part3 = ({
    listData,
    currentPart,
    handleCheckBox,
    genCharArray,
    index,
}) => {
    const audio = ToeicTest.Practice_Tests[`Part${currentPart}`]?.audio?.[listData[0].audio];
    const indexData = index - (index % 3);
    return (
        <>
            {listData[0].audio?.includes('.mp3') && (
                <div className='audio'>
                    <audio src={audio} controls="play"></audio>
                </div>
            )}
            {listData.length > 0 &&
                listData.map((data, i) => {
                    return (
                        <div key={i} >
                            <div className='question'>
                                <span >Question {i + indexData + 1}:</span>
                                <p className='question-detail'>{data.questionDescription}</p>
                            </div>
                            {
                                data?.answers?.map((answer, i) => {
                                    let key = genCharArray(0, data?.answers.length - 1)[i];
                                    return (
                                        <div key={i} className='answer'>

                                            <Form>
                                                <div className="form-check">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            onChange={(e) => handleCheckBox(answer.id, data.questionID, e.target.checked)}
                                                            checked={answer.isSelected}
                                                        />
                                                        <span className='label-text'>{key}</span>
                                                    </label>
                                                    <label className="form-check-label" >{answer.description}</label>
                                                </div>
                                            </Form>
                                        </div >
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </>
    );
};

export default Part3;