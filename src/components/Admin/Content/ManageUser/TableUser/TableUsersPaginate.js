import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../../../common/handleCommon';

function TableUsersPaginate({
    listUsers,
    handleBtnUpdate,
    handleBtnView,
    handleBtnDelete,
    handlePageClick,
    pageCount,
    currentPage,
}) {
    const listAllUser = useSelector(state => state.userManage.listUser);
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // when people stop typing(delay 1000ms), then will call api
    const debouncedValue = useDebounce(query, 1000);
    useEffect(() => {
        if (debouncedValue) {
            const a = listAllUser.filter(user =>
                user.username.toLowerCase().includes(debouncedValue) ||
                user.email.toLowerCase().includes(debouncedValue) ||
                user.role.toLowerCase().includes(debouncedValue));
            setSearchResult(a);
        } else {
            setSearchResult([]);
        }
    }, [debouncedValue]);
    const handleSeach = (e) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <input type='text' placeholder='Search...' className='search mb-2'
                onChange={(e) => handleSeach(e)}
            />
            <div className='table'>
                <Table striped bordered hover>
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.length > 0 ?
                            searchResult.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.toUpperCase()}</td>
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
                            :
                            <>
                                {
                                    listUsers.length > 0 ?
                                        (
                                            listUsers.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{user.id}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role.toUpperCase()}</td>
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
                                        )
                                }
                            </>
                        }

                    </tbody>
                </Table>
            </div>
            {searchResult.length === 0 &&
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
            }

        </>
    );
}

export default TableUsersPaginate;
