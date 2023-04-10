import { tranferToAlphabet } from '../../../../../utils/commonFunction';
import CheckCorrect from '../IconCheck/CheckCorrect';
import CheckIncorrect from '../IconCheck/CheckIncorrect';
import QuestionResult from '../../../../../assets/ToeicTests/Practice_Tests/QuestionResult';
import { AiOutlineArrowRight } from 'react-icons/ai';
const Part67 = ({
    listData,
    handleCheckBox,
    currentPart,
    index,
    isShowResultQuiz,
    isShowAnswer
}) => {
    let paragraph;
    let indexData;
    if (+currentPart === 6) {
        indexData = index - (index % 3);
        paragraph = listData[0].paragraph.replace(/\\"/g, '"').replaceAll('\\n', '');

    }
    if (+currentPart === 7) {
        indexData = index;
        paragraph = listData[0].paragraph.replaceAll('\\n', '').replaceAll('\\t', '');
        if (paragraph[0] === '[') {
            paragraph = JSON.parse(paragraph).join('<hr/>');
        } else {
            paragraph = paragraph.replace(/\\"/g, '"');
        }
    }
    return (
        <>
            <div

                className={+currentPart === 7 ? 'group-question-p7' : 'group-question-p6'}
                id={+currentPart === 7 ? 'group-question-p7' : ''}
            >
                {listData.length > 0 &&
                    listData.map((data, i) => {
                        return (
                            <div key={i} style={{ maxWidth: '500px' }} >
                                <div className='question'>
                                    <span >Question {i + indexData + 1}:</span>
                                    <p className='question-detail'>{data.questionDescription}</p>
                                </div>
                                {data?.answers?.map((answer, n) => {
                                    let key = tranferToAlphabet(0, data?.answers.length - 1)[n];
                                    return (
                                        <div key={n} className='answer'>
                                            <div className="form-check" style={isShowAnswer ? { paddingLeft: '0' } : {}} >
                                                <label>
                                                    <input
                                                        disabled={isShowResultQuiz}
                                                        type="radio" name={`flexRadio${data?.questionID}`}
                                                        className="form-check-input"
                                                        onChange={(e) => handleCheckBox(answer.id, data.questionID, e.target.checked)}
                                                        checked={answer.isSelected}
                                                    />
                                                    <span
                                                        style={isShowResultQuiz ? { cursor: "not-allowed" } : {}}
                                                        className='label-text'
                                                    >
                                                        {key}
                                                    </span>
                                                </label>
                                                <label className="form-check-label" >{answer.description}</label>
                                                {isShowAnswer &&
                                                    <>
                                                        <span> <AiOutlineArrowRight />
                                                            <span style={{ color: '#0478d1' }}>{QuestionResult[`Part${currentPart}`][listData[i].questionID][n][1]}</span></span>
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
                                        dangerouslySetInnerHTML={{ __html: QuestionResult[`Part${currentPart}`][listData[i].questionID][4][1] }}
                                    />
                                }
                            </div>
                        );
                    })
                }
            </div>
            <div className=
                {`${+currentPart === 7 ? 'group-content-p7' : 'group-content-p6'} ${isShowAnswer ? `active ${+currentPart === 6 ? 'position-paragraph1' : 'position-paragraph2'}` : ''}                              `}

                dangerouslySetInnerHTML={{ __html: paragraph }} />

        </>
    );
};

export default Part67;