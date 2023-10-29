import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Routes} from 'react-router-dom';
import Collections from './Collections';
import TextConnection from "@/components/TextConnection";
import '../css/Menu.css';
import UserCollections from "@/components/UserCollections";

interface Props{
    wallet: any
}

const Menu: React.FC<Props> = ({wallet}) => {
    return (
        <Router>
        <nav className="links">
            <div>
                <NavLink to="/" className={(navData) => navData.isActive ? "active" : "" } >All Collections</NavLink>
            </div>
            <div>
                <NavLink to="/me" className={(navData) => navData.isActive ? "active" : "" }> My Collections </NavLink>
            </div>
            <TextConnection wallet={wallet}/>
        </nav>
            <Routes>
                <Route path="/" element={<Collections wallet={wallet}/>} />
                <Route path="/me" element={<UserCollections wallet={wallet}/>} />
            </Routes>
        </Router>
    );
};

export default Menu;
