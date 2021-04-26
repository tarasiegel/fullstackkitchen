import * as React from "react";
import titleLogo from './../../content/assets/fullstackkitchen_logo.svg';
import ReactVivus from 'react-vivus';
import { Link } from 'gatsby';
import { Icon } from 'react-icons-kit';
import {instagram} from 'react-icons-kit/fa/instagram';

class Header extends React.Component {

    constructor(props) {

    super(props);
        this.state = {
            start: false,
            menuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        return (
        <div className="header">
            <Link
            style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
            }}
            className="header-logo-container"
            to={`/`}
            >
                <ReactVivus id="header-logo" 
                    option={{
                    file: titleLogo,
                    animTimingFunction: 'EASE',
                    type: 'delayed',
                    delay: 200,
                    duration: 500,
                    onReady: console.log
                    }}
                    style={{ height: 'auto', width: '450px' }}
                    callback={console.log}
                />
            </Link>
            <div className={`header__link-container ${(this.state.menuOpen) ? 'menu-open' : ''}`}>
                <div className={`header__menu mobile`} onClick={this.toggleMenu}>menu</div>
                <div className="header__link mobile"><Link to={'/'}>home</Link></div>
                <div className="header__link"><Link to={'/about'}>about</Link></div>
                <div className="header__link"><Link to={'/recipes'}>recipes</Link></div>
                <div className="header__link"><a href="https://www.instagram.com/taras.kitchen" target="_blank" rel="noreferrer"><Icon size={30} icon={instagram}/></a></div>

            </div>
        </div>
        );
    }
}

export default Header;