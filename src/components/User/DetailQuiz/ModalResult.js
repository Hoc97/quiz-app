import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalResult({
    show,
    setShow,
    dataModal,
    handleShowResult,
    setIsShowResultQuiz
}) {
    const handleClose = () => {
        setIsShowResultQuiz(true);
        setShow(false);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >Total Correct Answers: <b style={{ color: 'red' }}  >{dataModal.countCorrect}/{dataModal.countTotal}</b></div>
                    <div >Please show the answer for more details</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleShowResult()}>
                        Show answers
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
