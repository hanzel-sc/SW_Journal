import './header.css'
import Navbar from './navbar.js';

function Header(){
return (
    <header className='header'>
        <div className='header-container'>
        <img className="logo" src = "icon2.png" alt="SWJ logo"></img>
            <Navbar></Navbar>
        </div>
    </header>
)
}
export default Header;
