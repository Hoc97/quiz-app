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
                    <Modal.Title>Vui lòng xác nhận lại?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Bạn chưa hoàn thành bài kiểm tra của mình.</div>
                    <div>Bạn có muốn nộp bài?</div>
                    <div>Đã trả lời: <b>{answered}/{lengthQuiz}</b> câu hỏi</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Tiếp tục làm
                    </Button>
                    <Button variant='primary' onClick={handleSubmit} >
                        Nộp bài
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNotiSubmit;
