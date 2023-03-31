import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNotiRerefsh({ show, setShow, handleRefresh }) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Refresh?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>You haven't finished your quiz yet. Do you want to refresh?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Keep doing
                    </Button>
                    <Button variant='primary' onClick={handleRefresh} >
                        Refresh
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNotiRerefsh;
