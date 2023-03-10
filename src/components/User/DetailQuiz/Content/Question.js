import _ from 'lodash';
import Form from 'react-bootstrap/Form';
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';
function Question({ data, index, handleCheckBox }) {

    const [previewImage, setPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return <></>;
    }
    const genCharArray = (charA, charZ) => {
        let a = [];
        let i = `${charA}`.charCodeAt(0) + 17;
        let j = `${charZ}`.charCodeAt(0) + 17;
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    };

    const handleCheckAnswer = (e, ansID, quesID) => {
        handleCheckBox(ansID, quesID, e.target.checked);
    };
    return (
        <div className='question-container'>
            <div className='image'>{data.image ?
                <img
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPreviewImage(true)}
                    src={`data:image/jpeg;base64,${data.image}`} alt='' />
                : ''}
            </div>
            {previewImage &&
                <Lightbox

                    image={`data:image/jpeg;base64,${data.image}`}
                    title={data.questionDescription}
                    onClose={() => setPreviewImage(false)}
                >
                </Lightbox>}
            <div className='question'>
                <span>Question {index + 1}:</span>
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
                                        onChange={(e) => handleCheckAnswer(e, answer.id, data.questionID)}
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
        </div >
    );
}

export default Question;
