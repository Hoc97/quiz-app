import { Button } from 'react-bootstrap';
import { useEffect, useImperativeHandle, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../../services/apiService';
import ModalDeleteQuiz from './ModalQuiz/ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalQuiz/ModalUpdateQuiz';

function TableQuiz({ tableRef, query }) {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [userUpdate, setUserUpdate] = useState({});
    const [userDelete, setUserDelete] = useState({});
    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            setListQuiz(res.DT);
        }
    };
    const handleBtnUpdate = (quiz) => {
        setShowModalUpdate(true);
        setUserUpdate(quiz);
    };
    const handleBtnDelete = (quiz) => {
        setShowModalDelete(true);
        setUserDelete(quiz);
    };

    useImperativeHandle(tableRef, () => {
        return {
            fetchQuiz() {
                fetchQuiz();
            }
        };
    });
    return (
        <>
            <Table striped bordered hover className='mt-2 '>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz.length > 0 &&
                        listQuiz.filter(quiz =>
                            quiz.description.toLowerCase().includes(query) ||
                            quiz.name.toLowerCase().includes(query)
                        ).map((quiz, i) => {
                            return (
                                <tr key={i}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.name}</td>

                                    <td>{quiz.image && (
                                        <img className='image-list-quiz' src={`data:image/jpeg;base64,${quiz.image}`} alt='' />
                                    )}</td>
                                    <td className='action-btn'>
                                        <Button onClick={() => handleBtnUpdate(quiz)} variant='success' className='mx-3 resize'>
                                            Update
                                        </Button>
                                        <Button onClick={() => handleBtnDelete(quiz)} variant='danger' className='resize'>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ModalUpdateQuiz
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                userUpdate={userUpdate}
                fetchQuiz={fetchQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDelete}
                setShow={setShowModalDelete}
                userDelete={userDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    );
}

export default TableQuiz;
