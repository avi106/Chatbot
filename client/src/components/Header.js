import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
        <nav style={{ backgroundColor: '#3b6dd1'}}>
            <div className="nav-wrapper">
                <Link to={'/'} className="brand-logo">VUCHAT</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/shop'}>Courses</Link></li>
                <li><Link to={'/about'}>About Us</Link></li>
            </ul>
            </div>
        </nav>
    )


export default Header;