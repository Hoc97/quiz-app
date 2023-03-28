import React from 'react';
import Form from 'react-bootstrap/Form';
const Part6 = ({
    listData,
    currentPart,
    handleCheckBox,
    genCharArray,
    index,
}) => {
    const paragraph = listData[0].paragraph.replace(/\\"/g, '"').replaceAll('\\n', '');
    const indexData = index - (index % 3);
    return (
        <>
            <div className='group-content-p6'
                dangerouslySetInnerHTML={{ __html: paragraph }} />
            <div >
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
            </div>
        </>
    );
};

export default Part6;