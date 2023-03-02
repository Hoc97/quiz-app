import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

function TableUsersPaginate({
    listUsers,
    handleBtnUpdate,
    handleBtnView,
    handleBtnDelete,
    handlePageClick,
    pageCount,
    currentPage,
}) {
    return (
        <>
            <Table striped bordered hover>
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
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button onClick={() => handleBtnView(user)} variant='primary'>
                                            View
                                        </Button>
                                        <Button
                                            onClick={() => handleBtnUpdate(user)}
                                            variant='success'
                                            className='mx-3'
                                        >
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
            <ReactPaginate
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel='< Prev'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </>
    );
}

export default TableUsersPaginate;
