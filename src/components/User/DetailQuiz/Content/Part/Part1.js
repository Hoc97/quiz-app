import React from 'react';
import Form from 'react-bootstrap/Form';
import Lightbox from "react-awesome-lightbox";
import ToeicTest from '../../../../../assets/ToeicTests/ToeicTest';
const Part1 = ({
    data,
    currentPart,
    handleCheckBox,
    genCharArray,
    index,
    previewImage,
    setPreviewImage
}) => {
    const audio = ToeicTest.Practice_Tests[`Part${currentPart}`]?.audio?.[data.audio];
    return (
        <>
            <div className='image'>{data.image ?
                <img
                    onClick={() => setPreviewImage(true)}
                    src={`data:image/jpeg;base64,${data.image}`} alt='' />
                : ''}
            </div>
            {data.audio?.includes('.mp3') && (
                <div className='audio'>
                    <audio src={audio} controls="play"></audio>
                </div>
            )}
            {previewImage &&
                <Lightbox

                    image={`data:image/jpeg;base64,${data.image}`}
                    title={data.questionDescription}
                    onClose={() => setPreviewImage(false)}
                >
                </Lightbox>}
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
            })}
        </>
    );
};

export default Part1;