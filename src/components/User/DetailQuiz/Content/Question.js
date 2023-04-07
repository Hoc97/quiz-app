import _ from 'lodash';
import Part12 from './Part/Part12';
import Part34 from './Part/Part34';
import Part5 from './Part/Part5';
import Part67 from './Part/Part67';

function Question({
    data,
    index,
    handleCheckBox,
    currentPart,
    isShowResultQuiz,
    isShowAnswer
}) {
    return (
        <div className='question-quiz-container'>
            {!_.isEmpty(data) &&
                <>
                    {(+currentPart === 1 || +currentPart === 2) && <Part12
                        data={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        isShowResultQuiz={isShowResultQuiz}
                        isShowAnswer={isShowAnswer}
                    />}
                    {(+currentPart === 3 || +currentPart === 4) && <Part34
                        listData={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        isShowResultQuiz={isShowResultQuiz}
                        isShowAnswer={isShowAnswer}
                    />}
                    {+currentPart === 5 && <Part5
                        data={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        isShowResultQuiz={isShowResultQuiz}
                        isShowAnswer={isShowAnswer}
                    />}
                    <div>
                        {(+currentPart === 6 || +currentPart === 7) && <Part67
                            listData={data}
                            currentPart={currentPart}
                            handleCheckBox={handleCheckBox}
                            index={index}
                            isShowResultQuiz={isShowResultQuiz}
                            isShowAnswer={isShowAnswer}
                        />}
                    </div>
                </>
            }
        </div >
    );
}

export default Question;


