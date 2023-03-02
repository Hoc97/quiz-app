import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function TableUsers({ listUsers, handleBtnUpdate, handleBtnView, handleBtnDelete }) {
    return (
        <Table striped bordered hover className='ms-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers.length > 0 ? (
                    listUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button onClick={() => handleBtnView(user)} variant='primary'>
                                        View
                                    </Button>
                                    <Button onClick={() => handleBtnUpdate(user)} variant='success' className='mx-3'>
                                        Update
                                    </Button>
                                    <Button onClick={() => handleBtnDelete(user)} variant='danger'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>Not found data</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default TableUsers;
