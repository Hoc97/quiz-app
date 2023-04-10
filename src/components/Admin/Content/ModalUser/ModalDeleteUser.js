import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUsers } from '../../../../services/apiService';
function ModalDeleteUser({
    show,
    setShow,
    userDelete,
    fetchListUsersPaginate,
    currentPage,
}) {
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let data = await deleteUsers(userDelete.id);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsersPaginate(currentPage);
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete  user email = <b>{userDelete.email && userDelete.email}</b>
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
