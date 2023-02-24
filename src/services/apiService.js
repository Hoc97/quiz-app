import instance from '../utils/axiosCustomize';

const getAllUsers = () => {
    return instance.get('/api/v1/participant/all');
};

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return instance.post('/api/v1/participant', data);
};

const putUpdateUser = (id, password, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return instance.put('/api/v1/participant', data);
};

const deleteUsers = (id) => {
    return instance.delete('/api/v1/participant', { data: { id } });
};

const getUsersPaginate = (page, limit) => {
    return instance.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
    return instance.post('/api/v1/login', { email, password, delay: 3000 });
};

const postSignUp = (email, password, username) => {
    return instance.post('/api/v1/register', { email, password, username });
};

const getQuizByUser = () => {
    return instance.get(`/api/v1/quiz-by-participant`);
};

const getDataQuestions = (quizID) => {
    return instance.get(`/api/v1/questions-by-quiz?quizId=${quizID}`);
};
export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUsers,
    getUsersPaginate,
    postLogin,
    postSignUp,
    getQuizByUser,
    getDataQuestions,
};
