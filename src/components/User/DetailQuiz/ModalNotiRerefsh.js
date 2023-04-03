import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNotiRerefsh({ show, setShow, handleRefresh }) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Restart?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Bạn chưa hoàn thành bài kiểm tra của mình. </div>
                    <div>Bạn có muốn restart lại?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Tiếp tục làm
                    </Button>
                    <Button variant='primary' onClick={handleRefresh} >
                        Restart
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNotiRerefsh;
