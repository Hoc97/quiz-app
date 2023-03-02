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

const postLogout = (email, refresh_token) => {
    return instance.post('/api/v1/logout', { email, refresh_token });
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

const postSubmitQuiz = (data) => {
    return instance.post(`/api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return instance.post('/api/v1/quiz', data);
};

const getAllQuizForAdmin = () => {
    return instance.get(`/api/v1/quiz/all`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return instance.post('/api/v1/question', data);
};

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return instance.post(`/api/v1/answer`, { description, correct_answer, question_id });
};

const postAssignQuiz = (quizId, userId) => {
    return instance.post('/api/v1/quiz-assign-to-user', { quizId, userId });
};

const getQuizWithQA = (quizId) => {
    return instance.get(`/api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
    return instance.post(`api/v1/quiz-upsert-qa`, { ...data });
};


export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUsers,
    getUsersPaginate,
    postLogin,
    postLogout,
    postSignUp,
    getQuizByUser,
    getDataQuestions,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuiz,
    getQuizWithQA,
    postUpsertQA
};
