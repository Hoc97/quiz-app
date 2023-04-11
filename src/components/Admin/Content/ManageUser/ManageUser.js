import { Button } from 'react-bootstrap';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { getUsersPaginate } from '../../../../services/apiService';
import TableUsersPaginate from './TableUser/TableUsersPaginate';
import ModalCreateUser from '../ModalUser/ModalCreateUser';
import ModalUpdateUser from '../ModalUser/ModalUpdateUser';
import ModalViewUser from '../ModalUser/ModalViewUser';
import ModalDeleteUser from '../ModalUser/ModalDeleteUser';
import './ManageUser.scss';



function ManageUser() {
    const limitUser = 7;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [userView, setUserView] = useState({});
    const [userUpdate, setUserUpdate] = useState({});
    const [userDelete, setUserDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchListUsersPaginate(1);
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        fetchListUsersPaginate(event.selected + 1);
    };

    const fetchListUsersPaginate = async (page) => {
        let res = await getUsersPaginate(page, limitUser);
        let data = await res.DT;
        if (res.EC === 0) {
            setListUsers(data.users);
            setPageCount(data.totalPages);
        }
    };

    const handleBtnUpdate = (user) => {
        setUserUpdate(user);
        setShowModalUpdate(true);
    };
    const handleBtnView = (user) => {
        setUserView(user);
        setShowModalView(true);
    };
    const handleBtnDelete = (user) => {
        setUserDelete(user);
        setShowModalDelete(true);
    };
    return (
        <div className='user-manage-container'>
            <div className='title'>Users Management</div>
            <hr />
            <div className='user-content'>
                <div className='add-new'>
                    <Button className='btn-add' variant='primary' onClick={() => setShowModalCreate(true)}>
                        <FcPlus />
                        Add new user
                    </Button>
                </div>
                <div className='table-users'>
                    <TableUsersPaginate
                        listUsers={listUsers}
                        handleBtnUpdate={handleBtnUpdate}
                        handleBtnView={handleBtnView}
                        handleBtnDelete={handleBtnDelete}
                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                        currentPage={currentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreate}
                    setShow={setShowModalCreate}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    userUpdate={userUpdate}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                />
                <ModalViewUser show={showModalView} setShow={setShowModalView} userView={userView} />
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    userDelete={userDelete}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
