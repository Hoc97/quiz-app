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
                    <Modal.Title>Kết quả của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >Tổng số câu trả lời đúng: <b style={{ color: 'red' }}  >{dataModal.countCorrect}/{dataModal.countTotal}</b></div>
                    <div >Vui lòng nhấn vào xem kết quả chi tiết để biết thêm</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleShowResult()}>
                        Xem kết quả chi tiết
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;
