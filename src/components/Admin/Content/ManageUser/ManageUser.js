import { Button } from 'react-bootstrap';
import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { getAllUsers, getUsersPaginate } from '../../../../services/apiService';
// import TableUsers from './TableUser/TableUsersPaginate';
import TableUsersPaginate from './TableUser/TableUsersPaginate';
import ModalCreateUser from '../ModalUser/ModalCreateUser';
import ModalUpdateUser from '../ModalUser/ModalUpdateUser';
import ModalViewUser from '../ModalUser/ModalViewUser';
import ModalDeleteUser from '../ModalUser/ModalDeleteUser';
import './ManageUser.scss';

function ManageUser() {
    const limitUser = 7;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState({});
    const [userView, setUserView] = useState({});
    const [userDelete, setUserDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        //Sau khi render mới chạy vô hàm useEffect này
        // fetchListUsers();
        fetchListUsersPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        let data = await res.DT;
        if (res.EC === 0) {
            setListUsers(data);
        }
    };

    const handlePageClick = (event) => {
        // console.log(event.selected + 1);
        setCurrentPage(event.selected + 1);
        fetchListUsersPaginate(event.selected + 1);
    };

    const fetchListUsersPaginate = async (page) => {
        let res = await getUsersPaginate(page, limitUser);
        let data = await res.DT;
        // console.log(res);
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
                    {/* <TableUsers
                        listUsers={listUsers}
                        handleBtnUpdate={handleBtnUpdate}
                        handleBtnView={handleBtnView}
                        handleBtnDelete={handleBtnDelete}
                    /> */}
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
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    userUpdate={userUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser show={showModalView} setShow={setShowModalView} userView={userView} />
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    userDelete={userDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
