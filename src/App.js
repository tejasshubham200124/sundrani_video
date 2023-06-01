import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Pages/UserList';
import Logout from './Pages/Logout';
import MainLayout from './Components/MainLayout';
import Login from './Pages/Login';
import ChannelList from './Pages/ChannelList';
import ChannelInfo from './Pages/ChannelInfo';
import ViewBhaktiChannel from './Pages/ViewBhaktiChannel';
import VideoDetails from './Pages/VideoDetails';
import UploadFile from './Pages/UploadFile';
import ImageUpload2 from './Pages/ImageUpload2';
import FetchApi from './Pages/FetchApi';
// import Slider from '../Pages/Slider';
function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<MainLayout />} > 
          <Route index element={<ChannelList />} />
          <Route path='Channel_Info/:id' element={<ChannelInfo/>} />
          <Route path='ViewBhaktiChannels' element={<ViewBhaktiChannel/>} />
          <Route path='VideoDetails' element={<VideoDetails/>} />
          <Route path="userList" element={<UserList />} />
          <Route path="uploadFile" element={<UploadFile />} />
          <Route path="image2" element={<ImageUpload2 />} />
          <Route path="image3" element={<FetchApi />} />
          <Route path="logOut" element={<Logout />} />
         </Route> 
      </Routes>
  </Router>
  );
}

export default App;
