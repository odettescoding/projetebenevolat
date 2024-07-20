//  //import logo from './logo.svg';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Employe from './components/employe/Employe';
import Ajoutemploye from './components/employe/Ajoutemploye';
import Accueil from './components/Accueil';
import Absence from './components/Absence/Absence';
import Ajoutabsence from './components/Absence/Ajoutabsence';
import Detail from './components/Absence/Detail';


 function App() {
   return (
    
      <div className="App">
        
      <BrowserRouter>
       <Nav/>
       <Routes>
         <Route path='/' element={<Accueil/>}/>      
         <Route path='/employe' element={<Employe/>}/>
         <Route path='/ajoutemploye' element={<Ajoutemploye/>}/>
         <Route path='/absence' element={<Absence/>}/>
         <Route path='/detail' element={<Detail/>}/>
         <Route path='/ajoutabsence/:idemploye' element={<Ajoutabsence/>}/>
         
      </Routes>
      </BrowserRouter>
      
      <Footer />
  
     
      </div>
    
    

   );
 }

 export default App;
