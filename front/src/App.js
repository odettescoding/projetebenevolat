//  //import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Absence from './components/Absence/Absence';
import Ajoutabsence from './components/Absence/Ajoutabsence';
import Detail from './components/Absence/Detail';
import Accueil from './components/Accueil';
import Ajoutemploye from './components/employe/Ajoutemploye';
import Employe from './components/employe/Employe';
import Footer from './components/Footer';
import Nav from './components/Nav';


 function App() {
   return (
    
      <div className="App">
        
        <BrowserRouter>
          <div className='contenunavetroutes'>
            <Nav/>
            <Routes>
              <Route path='/' element={<Accueil/>}/>      
              <Route path='/employe' element={<Employe/>}/>
              <Route path='/ajoutemploye' element={<Ajoutemploye/>}/>
              <Route path='/absence' element={<Absence/>}/>
              <Route path='/detail' element={<Detail/>}/>
              <Route path='/ajoutabsence/:idemploye' element={<Ajoutabsence/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      
      <Footer />
  
     
      </div>
    
    

   );
 }

 export default App;
