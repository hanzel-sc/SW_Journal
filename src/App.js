import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/header.js';
import MainSection from './Components/main.js';
import Footer from './Components/footer.js';
import Home from './Components/home.js';
import SignUpModal from './Components/signupmodal.js';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const toggleModal = () => setIsLogin(!isLogin); 

    return (
        <Router>
            <div className='app-content'>
                <Header openModal={openModal} /> {/* Pass openModal to Header */}
                <SignUpModal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    isLogin={isLogin}
                    toggleModal={toggleModal}
                />
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<MainSection />} />              {/* Home route */}
                        <Route path="/profile" element={<Home />} /> {/* Profile route */}
                    </Routes>
                </main>
                
                <Footer /> 
            </div>
        </Router>
    );
}

export default App;
