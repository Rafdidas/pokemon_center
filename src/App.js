import { Route, Routes } from "react-router-dom";
import Header from "./component/header/header.component";
import Home from "./component/routes/home.component";
import Detail from "./component/detail/detail.component";
import './App.css';

const App = () => {
  
  return (
    <Routes>
      <Route path="/poke_dex" element={<Header/>} >
        <Route index element={<Home/>} />
        <Route path='detail/:id' element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;
