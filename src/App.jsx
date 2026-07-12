// Import the routing tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import our Layout and Pages
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    // 1. BrowserRouter wraps the whole app to listen to URL changes
    <BrowserRouter>
      
      {/* 2. Routes holds all our routing rules */}
      <Routes>
        
        {/* 3. This is the parent route. If URL starts with '/', show Layout */}
        <Route path="/" element={<Layout />}>
          
          {/* 4. 'index' means this is the default page for the '/' route. 
                 It will be injected into Layout's <Outlet /> */}
          <Route index element={<Home />} />
          
          {/* 5. If URL is '/search', inject <Search /> into Layout's <Outlet /> */}
          <Route path="search" element={<Search />} />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;