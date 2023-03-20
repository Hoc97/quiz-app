import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
function Password() {
    const [password, setPassword] = useState('');

    const handleUpdatePassword = () => {

    };
    return (
        <Form>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Button variant='warning' onClick={handleUpdatePassword}>
                Update password
            </Button>
        </Form>
    );
}

export default Password;