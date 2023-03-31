import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNotiSubmit({
    show,
    setShow,
    answered,
    lengthQuiz,
    handleFinishQuiz
}) {
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        setShow(false);
        handleFinishQuiz();
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>You haven't finished your quiz yet.</div>
                    <div>Do you want to submit?</div>
                    <div>Answered: <b>{answered}/{lengthQuiz}</b> questions</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Keep doing
                    </Button>
                    <Button variant='primary' onClick={handleSubmit} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNotiSubmit;
