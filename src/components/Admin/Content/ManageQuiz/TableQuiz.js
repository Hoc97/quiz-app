import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllQuizForAdmin } from '../../../../services/apiService';
// import { toast } from 'react-toastify';

function TableQuiz() {
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleBtnUpdate = () => { };
    const handleBtnDelete = () => { };
    return (
        <>
            <Table striped bordered hover className='mt-2'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz.length > 0 &&
                        listQuiz.map((n, i) => {
                            return (
                                <tr key={i}>
                                    <td>{n.id}</td>
                                    <td>{n.name}</td>
                                    <td>{n.description}</td>
                                    <td>{n.difficulty}</td>
                                    <td>
                                        <Button onClick={() => handleBtnUpdate(n)} variant='success' className='mx-3'>
                                            Update
                                        </Button>
                                        <Button onClick={() => handleBtnDelete(n)} variant='danger'>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
}

export default TableQuiz;
