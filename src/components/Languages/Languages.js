import NavDropdown from 'react-bootstrap/NavDropdown';
import './Languages.scss';
import { useTranslation } from 'react-i18next';

const lngs = {
    en: 'English',
    vi: 'Việt Nam'
};


function Languages() {
    const { i18n } = useTranslation();
    const handleChangLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <NavDropdown title={lngs[i18n.language]} id='basic-nav-dropdown' className='languages'>
            {Object.keys(lngs).map(lng => (
                <NavDropdown.Item key={lng} onClick={() => handleChangLanguage(lng)} >
                    {lngs[lng]}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

export default Languages;