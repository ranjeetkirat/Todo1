
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sider from './component/sider';
import About from './component/About';


function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Sider/>
 
  <Routes>

    <Route path='/about' element={<About/>}/>
  </Routes>
 </BrowserRouter>
    </div>
  );
}

export default App;
