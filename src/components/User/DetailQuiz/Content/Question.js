import _ from 'lodash';
import { useState } from 'react';
import Part1 from './Part/Part1';
import Part2 from './Part/Part2';
import Part3 from './Part/Part3';
import Part4 from './Part/Part4';
import Part5 from './Part/Part5';
import Part6 from './Part/Part6';
import Part7 from './Part/Part7';

function Question({ data, index, handleCheckBox, currentPart, isShowResultQuiz }) {
    const [previewImage, setPreviewImage] = useState(false);
    // console.log('data', data);
    const genCharArray = (charA, charZ) => {
        let a = [];
        let i = `${charA}`.charCodeAt(0) + 17;
        let j = `${charZ}`.charCodeAt(0) + 17;
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    };

    console.log(isShowResultQuiz);
    return (
        <div className='question-quiz-container'>
            {!_.isEmpty(data) &&
                <>
                    {+currentPart === 1 && <Part1
                        data={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}
                        previewImage={previewImage}
                        setPreviewImage={setPreviewImage}
                    />}

                    {+currentPart === 2 && <Part2
                        data={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}
                        isShowResultQuiz={isShowResultQuiz}

                    />}
                    {+currentPart === 3 && <Part3
                        listData={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}

                    />}
                    {+currentPart === 4 && <Part4
                        listData={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}

                    />}
                    {+currentPart === 5 && <Part5
                        data={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}

                    />}
                    {+currentPart === 6 && <Part6
                        listData={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}

                    />}
                    {+currentPart === 7 && <Part7
                        listData={data}
                        currentPart={currentPart}
                        handleCheckBox={handleCheckBox}
                        index={index}
                        genCharArray={genCharArray}

                    />}
                </>
            }
        </div >
    );
}

export default Question;
