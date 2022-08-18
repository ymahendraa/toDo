import DetailActivity from "./pages/Detail Activity/DetailActivity";
import HomeScreen from "./pages/Home/Home";
import Header from "./UI/Header/Header";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<HomeScreen/>} path="/"/>
      <Route element={<DetailActivity/>} path="detail/:id"/>
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
