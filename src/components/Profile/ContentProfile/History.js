import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getQuizHistory } from '../../../services/apiService';
import { toast } from 'react-toastify';
import moment from 'moment';
function History() {
    const [listHistory, setListHistory] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(() => {
        fetchHistory();
    }, []);
    const fetchHistory = async () => {
        let res = await getQuizHistory();
        if (res.EC === 0) {
            let list = res.DT.data;
            let newData = list.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    quiz_name: item.quizHistory.description,
                    id: item.id,
                    date: moment(item.updatedAt).format('DD/MM/YYYY hh:mm:ss A')
                };
            });
            setListHistory(newData);
        } else {
            toast.success(res.EC);
        }
    };

    return (
        <>
            <input type='text' placeholder='Search...' className='search mb-2'
                onChange={(e) => setQuery(e.target.value)}
            />
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên bài thi</th>
                        <th>Kết quả</th>
                        <th>Thời gian thi</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory.length > 0 && listHistory.filter((quizHistory) =>
                        quizHistory.quiz_name.toLowerCase().includes(query) ||
                        quizHistory.total_correct === +query ||
                        quizHistory.date.toLowerCase().includes(query)
                    ).map((n, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{n.quiz_name} </td>
                                <td className='color'>{n.total_correct}/{n.total_questions}</td>
                                <td>{n.date}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br />
            <hr />
        </>
    );
}

export default History;