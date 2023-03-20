import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import noImage from '../../../assets/img/no image.jpg';
import { postUpdateProfile } from '../../../services/apiService';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../../redux/action/action';

function AccountInfor() {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.userManage.account);

    const [account, setAccount] = useState({
        email: accountData.email,
        username: accountData.username,
        role: accountData.role,
        image: accountData.image,
        previewImage: accountData.image ? `data:image/jpeg;base64,${accountData.image}` : noImage
    });
    console.log('acc', account);
    const handleInput = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = (e) => {
        console.log('image', e.target.files[0], URL.createObjectURL(e.target.files[0]));
        if (e.target.files[0]) {
            setAccount({
                ...account,
                previewImage: URL.createObjectURL(e.target.files[0]),
                image: e.target.files[0]
            });

        } else {
            // setPreviewImage('');
        }
    };



    const handleUpdateInfo = async () => {
        //validate

        if (!account.username) {
            toast.error('Invalid Username');
            return;
        }

        //call API
        // Bên axiosCustom phần interceptor return response.data rồi nên nó sẽ lấy đc data lun
        let data = await postUpdateProfile(account.username, account.image);
        console.log(data);
        if (data.EC === 0) {
            dispatch(userUpdate(data));
            toast.success(data.EM);
            // await fetchListUsers();
        } else {
            toast.warning(data.EM);
        }
    };
    return (
        <Form >
            <Row className='mb-3'>
                <Form.Group as={Col} xs={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        disabled
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        value={account.email}
                        onChange={handleInput}
                    />
                </Form.Group>
            </Row>

            <Row className='mb-3'>
                <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder='Username'
                        name='username'
                        value={account.username}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        disabled
                        value={account.role}
                        name='role'
                        onChange={handleInput}
                    >
                        <option value='USER'>USER</option>
                        <option value='ADMIN'>ADMIN</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group className='mb-3'>
                <Form.Label className='label-upload' htmlFor='labelUpload'>
                    <FiUpload color='009688' size={20} />
                    Upload Image
                </Form.Label>
                <Form.Control type='file' id='labelUpload' hidden onChange={handleUpload} />
            </Form.Group>
            <Form.Group className='mb-3 img-preview'>
                {account.previewImage ? (
                    <img className='image' src={account.previewImage} alt='' />
                ) : (
                    <span>Preview Image</span>
                )}
            </Form.Group>
            <Button variant='warning' onClick={handleUpdateInfo}>
                Update info
            </Button>
        </Form>
    );
}

export default AccountInfor;