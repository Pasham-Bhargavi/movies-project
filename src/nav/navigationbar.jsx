
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import PremierContext from '../context/premierContext';
import { useContext } from 'react';
import "./navigation.css";


const Navigationbar = () => {
    const { username } = useContext(PremierContext);
    
    return (
        <div className="navbar-wrapper">
            <div className="navbar-container">
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link style={{ color: "black" }}>
                            <h4>Welcome {username}</h4>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ color: "black" }}>Bookyourshow.com</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link
                            style={{ color: "black", lineHeight: "50px", textDecoration: "none" }}
                            to={"/"}
                        >
                            Home
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    )
}
export default Navigationbar

