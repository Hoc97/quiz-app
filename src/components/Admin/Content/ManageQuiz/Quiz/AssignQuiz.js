import { useState, useEffect } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import {
    getAllQuizForAdmin,
    getAllUsers,
    postAssignQuiz

} from '../../../../../services/apiService';
import { child, push, ref, set, update } from 'firebase/database';
import { database } from '../../../../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';


function AssignQuiz() {
    const dispatch = useDispatch();
    const [listQuiz, setListQuiz] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({ value: '', label: 'Select quiz...' });
    const [selectedUser, setSelectedUser] = useState({ value: '', label: 'Select user...', name: '', email: '' });
    const allowNoti = useSelector(state => state.notiManage.allowNoti);
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            const newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            const newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                    name: item.username,
                    email: item.email
                };
            });
            setListUsers(newUser);
        }
    };
    const handleChangeQuiz = (selectedOption) => {
        setSelectedQuiz(selectedOption);
    };

    const handleChangeUser = (selectedOption) => {
        setSelectedUser(selectedOption);
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res.EC === 0) {
            toast.success(`Assign the quiz ${selectedQuiz.value} to the user '${selectedUser.name}' succeed`);
            setSelectedQuiz({ value: '', label: 'Select quiz...' });
            setSelectedUser({ value: '', label: 'Select user...', name: '', email: '' });
        } else {
            toast.error(res.EM);
        }
    };

    const [count, setCount] = useState(20);
    useEffect(() => {
        const dbRef = ref(database);
        if (selectedUser.value) {
            set(child(dbRef, `user/${selectedUser.value}`), {
                userEmail: selectedUser.email,
                quizID: selectedQuiz.value
            });
        }
    }, [count]);

    const handleWriteFireBase = () => {
        setCount(count => count + 1);
    };
    return (
        <div className='assign-quiz-container row'>
            <div className='mb-3 col-6'>
                <Form.Label>Select quiz:</Form.Label>
                <Select
                    value={selectedQuiz}
                    onChange={handleChangeQuiz}
                    options={listQuiz}
                    placeholder="Question type"
                />
            </div>
            <div className='mb-3 col-6'>
                <Form.Label>Select user:</Form.Label>
                <Select
                    value={selectedUser}
                    onChange={handleChangeUser}
                    options={listUsers}
                    placeholder="Question type"
                />
            </div>
            <div className='mt-3 text-end'>
                <Button variant="warning" onClick={() => handleAssign()}>Assign Quiz for User </Button>
            </div>
            <div className='text-end' onClick={handleWriteFireBase}>
                <Button variant="warning ">aaaa</Button>
            </div>
        </div>
    );
}

export default AssignQuiz;