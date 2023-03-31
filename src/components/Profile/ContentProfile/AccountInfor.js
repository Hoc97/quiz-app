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

import { blobToBase64, urltoFile } from '../../../utils/commonFunction';

function AccountInfor() {
    const dispatch = useDispatch();
    const accountData = useSelector((state) => state.accountManage.account);

    const [account, setAccount] = useState({
        email: accountData.email,
        username: accountData.username,
        role: accountData.role,
        image: accountData.image,
        previewImage: accountData.image ? `data:image/jpeg;base64,${accountData.image}` : noImage
    });
    const handleInput = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = async (e) => {
        //slice from comma ',' to end 
        const ToStringBase64 = blob => blobToBase64(blob).then(text => text.slice(text.indexOf(",") + 1));
        if (e.target.files[0]) {
            setAccount({
                ...account,
                previewImage: await blobToBase64(e.target.files[0]),
                image: await ToStringBase64(e.target.files[0])
            });

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
        const imageFile = await urltoFile(account.previewImage, `${account.username}.png`, 'image/png');
        let data = await postUpdateProfile(account.username, imageFile);
        if (data.EC === 0) {

            dispatch({
                type: 'USER_UPDATE',
                payload: { data, image: account.image }
            });
            toast.success(data.EM);
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
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        placeholder='Username'
                        name='username'
                        value={account.username}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Vai trò</Form.Label>
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
                    Cập nhật hình ảnh
                </Form.Label>
                <Form.Control type='file' id='labelUpload' hidden onChange={handleUpload} />
            </Form.Group>
            <Form.Group className='mb-3 img-preview'>
                {account.previewImage ? (
                    <img className='image' src={account.previewImage} alt='' />
                ) : (
                    <span>Xem trước hình ảnh</span>
                )}
            </Form.Group>
            <Button variant='warning' onClick={handleUpdateInfo}>
                Cập nhật thông tin
            </Button>
        </Form>
    );
}

export default AccountInfor;