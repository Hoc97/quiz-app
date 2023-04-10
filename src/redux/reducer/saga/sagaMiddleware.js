import { put, call, takeLatest, delay } from 'redux-saga/effects';
import {
    getAllUsers, getQuizByUser, postSignUp, postLogin, postLogout,
} from '../../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash';



const postSignUpApi = async (key) => {
    const dt = await postSignUp(key.email, key.password, key.username);
    return dt;
};

function* postSignUpUser({ type, data, navigate }) {
    let res = yield call(postSignUpApi, data);
    if (res.EC !== 0) {
        toast.error(res.EM);
        return;
    }
    toast.success(res.EM);
    yield delay(2000);
    navigate('/login');
}

const postLoginApi = async (key) => {
    const dt = await postLogin(key.email, key.password);
    return dt;
};

function* postLoginUser({ type, data, navigate, setIsLoading }) {
    let res = yield call(postLoginApi, data);
    if (res.EC !== 0) {
        toast.error(res.EM);
        setIsLoading(false);
        return;
    }
    yield put({
        type: 'GET_DATA_LOGIN',
        payload: res,
    });
    yield put({ type: 'GET_LIST_USER' });
    toast.success(res.EM);
    setIsLoading(false);
    navigate('/');
}


const postLogoutApi = async (key) => {
    const dt = await postLogout(key.email, key.refresh_token);
    return dt;
};

function* postLogOutUser({ type, data, navigate }) {
    let res = yield call(postLogoutApi, data);
    if (res.EC !== 0) {
        toast.error(res.EM);
        return;
    }
    yield put({ type: 'USER_LOGOUT' });
    navigate('/login');
}



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
    yield put({
        type: 'SET_LIST_QUIZ',
        payload: { newArrQuiz, newListTimerQuiz },
    });
}

function* getListQuizCur({ type, keydata }) {
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
    yield put({
        type: 'SET_LIST_QUIZ_CURRENT',
        payload: newArrQuiz,
    });
}


const getListUserApi = async (key) => {
    const dt = await getAllUsers();
    return dt;
};

function* getListUser({ type, keydata }) {
    let res = yield call(getListUserApi);
    if (res.EC !== 0) {
        toast.error(res.EM);
        return;
    }
    yield put({
        type: 'SET_LIST_USER',
        payload: res.DT,
    });
}




///Receice 'type' from dispatch to run function 
function* sagaMiddleware() {
    yield takeLatest('POST_LOGIN', postLoginUser);
    yield takeLatest('POST_SIGN_UP', postSignUpUser);
    yield takeLatest('POST_LOGOUT', postLogOutUser);
    yield takeLatest('GET_LIST_QUIZ', getListQuiz);
    yield takeLatest('GET_LIST_QUIZ_CURRENT', getListQuizCur);
    yield takeLatest('GET_LIST_USER', getListUser);
}

export default sagaMiddleware;

