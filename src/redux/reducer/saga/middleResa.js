import { takeLatest, put, delay, call, takeEvery } from 'redux-saga/effects';
import { getQuizByUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

// async function GetUserApi(key) {
//     let res = await fetch(
//         `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=30&format=json&search=${key}`
//     );
//     let dt = await res.json();
//     return dt;
// }

// function* GetDataLatest({ type, keydata }) {
//     yield delay(1000);
//     let data = yield call(GetUserApi, keydata);
//     console.log('data', data[1]);
//     yield put({
//         type: 'SET_DATA',
//         payload: data[1],
//     });
// }


// const getListQuizApi = async () => {
//     const dt = await getQuizByUser();
//     return dt;
// };

// function* getListQuiz({ type, keydata }) {
//     let res = yield call(getListQuizApi);
//     console.log('res', res);
//     if (res.EC !== 0) {
//         toast.error(res.EM);
//         return;
//     }
//     yield put({
//         type: 'SET_LIST_QUIZ',
//         payload: res.DT,
//     });
// }





function* middleReSa() {
    // yield takeEvery('GET_LIST_QUIZ', getListQuiz);
    // yield takeEvery('GET_DETAIL_QUIZ', getDetailQuiz);
}

export default middleReSa;
