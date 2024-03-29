import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { postChangePassword } from '../../../services/apiService';
import { toast } from 'react-toastify';
function Password() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleUpdatePassword = async () => {
        //validate
        if (!currentPassword) {
            toast.error('Invalid current password');
            return;
        }
        if (newPassword === currentPassword) {
            toast.error(`New password can't be duplicated current password`);
            return;
        }
        if (!newPassword) {
            toast.error('Invalid new password');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Wrong confirm password');
            return;
        }
        //call API
        let data = await postChangePassword(currentPassword, newPassword);
        if (data.EC === 0) {
            toast.success(data.EM);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error(data.EM);
        }
    };
    return (
        <Form>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                        type='password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Xác nhận lại mật khẩu</Form.Label>
                    <Form.Control
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Button variant='warning' onClick={handleUpdatePassword}>
                Cập nhật mật khẩu
            </Button>
        </Form>
    );
}

export default Password;