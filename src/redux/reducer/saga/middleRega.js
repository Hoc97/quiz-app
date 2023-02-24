import { takeLatest, put, delay, call } from 'redux-saga/effects';

async function GetUserApi(key) {
    let res = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=30&format=json&search=${key}`
    );
    let dt = await res.json();
    return dt;
}

function* GetDataLatest({ type, keydata }) {
    yield delay(1000);
    let data = yield call(GetUserApi, keydata);
    console.log('data', data[1]);
    yield put({
        type: 'SET_DATA',
        payload: data[1],
    });
}

function* middleReSa() {
    yield takeLatest('GETDATA', GetDataLatest);
}

export default middleReSa;
