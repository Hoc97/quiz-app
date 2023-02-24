import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUsers } from '../../../../services/apiService';
function ModalDeleteUser({
    show,
    setShow,
    userDelete,
    fetchListUsers,
    fetchListUsersPaginate,
    currentPage,
    setCurrentPage,
}) {
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let data = await deleteUsers(userDelete.id);
        console.log(data);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUsers();
            // setCurrentPage(1);
            await fetchListUsersPaginate(currentPage);
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this use. email = <b>{userDelete.email && userDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='primary' onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
