import { useHistory } from 'react-router-dom';
import { useStore } from '../../hooks-store/store';
import './Header.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import logoIconPrimary from '../../static/img/logo-primary.svg';

const Header = () => {
    const history = useHistory();
    const dispatch = useStore(false)[1];

    const logoutHandler = () => {
        dispatch('LOG_USER_OUT');
        history.push('/login');
    };

    return (
        <div className="header">
            <SVGIcon iconName="Capa_1" iconObj={logoIconPrimary} classNames="logo-header"/>
            <div className="logout-button" onClick={logoutHandler}>Logout</div>
        </div>
    );
};

export default Header;