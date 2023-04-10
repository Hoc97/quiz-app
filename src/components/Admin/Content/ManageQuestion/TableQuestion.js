import React from 'react';
import { Table } from 'react-bootstrap';

const TableQuestion = ({ listQuestion, query }) => {
    return (
        <>
            <div className='question-table'>
                <Table striped bordered hover className='mt-2'>
                    <thead>
                        <tr>
                            <th className='ID'>ID</th>
                            <th className='Description'>Description</th>
                            <th className='QuizId'>QuizId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuestion.length > 0 &&
                            listQuestion.filter(question =>
                                question.quiz_id === +query || question.description.toLowerCase().includes(query)
                            ).map((question, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{question.id}</td>
                                        <td className='question-description'>{question.description}</td>
                                        <td>{question.quiz_id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default TableQuestion;