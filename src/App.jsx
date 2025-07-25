import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/home';
import Manage from './admin/manageModels';
import AdminModel from './admin/adminModel';
import ModelPage from './pages/modelPage';
import Contact from './pages/contact';
import Become from './pages/becomeAmodel';
import About from './pages/about';

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position='top-right'/>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/admin/manage/models/123456" element={<Manage />} />
         <Route path="/manage/model/:modelId" element={<AdminModel />} />
         <Route path="/profile/model/:modelId" element={<ModelPage />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/become" element={<Become />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
