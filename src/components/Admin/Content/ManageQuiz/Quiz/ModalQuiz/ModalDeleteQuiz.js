import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../../../services/apiService';
function ModalDeleteQuiz({
    show,
    setShow,
    userDelete,
    fetchQuiz,
}) {
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let data = await deleteQuiz(userDelete.id);
        if (data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchQuiz();
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete quiz {userDelete.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete quiz name = <b>{userDelete.description && userDelete.description}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='primary'
                        onClick={handleSubmitDeleteUser}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;
