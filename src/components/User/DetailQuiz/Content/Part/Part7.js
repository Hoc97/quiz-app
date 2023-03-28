import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
const Part7 = ({
    listData,
    currentPart,
    handleCheckBox,
    genCharArray,
    index,
}) => {
    let paragraph = listData[0].paragraph.replaceAll('\\n', '').replaceAll('\\t', '');
    if (paragraph[0] === '[') {
        paragraph = JSON.parse(paragraph).join('<hr/>');
    } else {
        paragraph = paragraph.replace(/\\"/g, '"');
    }

    return (
        <>

            <div className='group-content-p7'
                dangerouslySetInnerHTML={{ __html: paragraph }} />
            <div className='group-question-p7' id='group-question-p7' >
                {listData.length > 0 &&
                    listData.map((data, i) => {
                        return (
                            <div key={i} >
                                <div className='question'>
                                    <span >Question {i + index + 1}:</span>
                                    <p className='question-detail'>{data.questionDescription}</p>
                                </div>
                                {
                                    data?.answers?.map((answer, i) => {
                                        let key = genCharArray(0, data?.answers.length - 1)[i];
                                        return (
                                            <div key={i} className='answer'>
                                                <Form >
                                                    <div className="form-check" style={{ display: "flex" }}>
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

export default Part7;
