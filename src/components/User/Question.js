import _ from 'lodash';
import Form from 'react-bootstrap/Form';
function Question({ data, index }) {
    if (_.isEmpty(data)) {
        return <></>;
    }
    function genCharArray(charA, charZ) {
        let a = [];
        let i = `${charA}`.charCodeAt(0) + 17;
        let j = `${charZ}`.charCodeAt(0) + 17;
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }
    const findIndexMax = (array) => {
        let indexMax = 0;
        array.forEach((item, index) => {
            if (indexMax < index) {
                indexMax = index;
            }
        });
        return indexMax;
    };

    const handleCheckAnswer = (e) => {
        console.log(e.target.name);
    };
    return (
        <div className='question-container'>
            <div className='image'>{data.image ? <img src={`data:image/jpeg;base64,${data.image}`} alt='' /> : ''}</div>
            <div className='question'>
                <span>Question {index + 1}:</span>
                <p className='question-detail'>{data.questionDescription}</p>
            </div>
            {data?.answers?.map((answer, index) => {
                let key = genCharArray(0, findIndexMax(data?.answers))[index];
                return (
                    <div key={index} className='answer'>
                        <span>{key}</span>
                        <Form>
                            <Form.Check
                                onClick={handleCheckAnswer}
                                name={`Answer ${index + 1}`}
                                type='checkbox'
                                id='check-answer'
                                label={answer.description}
                            />
                        </Form>
                    </div>
                );
            })}
        </div>
    );
}

export default Question;
