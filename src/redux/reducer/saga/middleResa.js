import { put, call, takeEvery } from 'redux-saga/effects';
import { getQuizByUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash';



const getListQuizApi = async (key) => {
    const dt = await getQuizByUser();
    return dt;
};

function* getListQuiz({ type, keydata }) {
    let res = yield call(getListQuizApi);
    if (res.EC !== 0) {
        toast.error(res.EM);
        return;
    }
    let newArrQuiz = res.DT;
    newArrQuiz = newArrQuiz.map((quiz) => {
        quiz.isInTimerRoom = false;
        quiz.order = quiz.description.match(/\d+\w*:/g)[0].replace(':', '');
        if (quiz.description.indexOf(': ') === -1) return quiz;
        quiz.title = quiz.description.slice(0, quiz.description.indexOf(': '));
        quiz.description = quiz.description.slice(quiz.title.length + 2);
        return quiz;
    });
    newArrQuiz = _.orderBy(newArrQuiz, ['order'], ['asc']);
    let newListTimerQuiz = [...Array(newArrQuiz.length)].map(n => 0);
    // console.log(newListTimerQuiz);
    yield put({
        type: 'SET_LIST_QUIZ',
        payload: { newArrQuiz, newListTimerQuiz },
    });
}


/////Receice 'type' from dispatch to run function 
function* middleReSa() {
    yield takeEvery('GET_LIST_QUIZ', getListQuiz);
    // yield takeEvery('GET_DETAIL_QUIZ', getDetailQuiz);
}

export default middleReSa;
