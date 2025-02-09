import './App.css';
import Header from './Components/header.js';
import MainSection from './Components/main.js';
import Footer from './Components/footer.js';

function App() {
  return (
    <div className='app-content'>
     <Header/>
      <main className="main-content">
        <MainSection/> 
        
      </main>
      <Footer/> 
    </div>
  );
}

export default App;
