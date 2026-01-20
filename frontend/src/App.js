import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import RoutesPage from './pages/RoutesPage';
import RouteDetailPage from './pages/RouteDetailPage';
import Contact from './pages/Contact';
import About from './pages/About';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProfilePage from './components/ProfilePage';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); //管理登录模态框状态
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); //管理注册模态框状态
  const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // 从后端获取用户信息
            fetch("https://rhinecustom.onrender.com/api/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        // token 无效，清除它
                        localStorage.removeItem('token');
                        throw new Error('Invalid token');
                    }
                })
                .then(data => {
                    setUser(data.user);
                })
                .catch(err => {
                    console.error('Failed to restore user session:', err);
                    setUser(null);
                });
        }
    }, []); // 只在组件挂载时运行一次


    const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };//打开模态框
  const closeLoginModal = () => setIsLoginOpen(false); //关闭模态框

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }
  const closeRegisterModal = () => setIsRegisterOpen(false);

  const handleLogout = async() => {
    const token = localStorage.getItem('token');
    if(token) {
        await fetch("https://rhinecustom.onrender.com/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
        <Navbar onLoginClick={openLoginModal} user={user} onLogout={handleLogout}/> {/* 传递控制函数给Navbar */}
        {/* 页面内容 */}
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/routes/:id" element={<RouteDetailPage />} />
            <Route path="/contact" element={<Contact user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage user={user} />}/>
        </Routes>
        <Footer />
        <LoginModal  isOpen={isLoginOpen} onClose={closeLoginModal}  onSwitchToRegister={openRegisterModal} setUser={setUser}/>
        <RegisterModal isOpen={isRegisterOpen} onClose={closeRegisterModal} onSwitchToLogin={openLoginModal}/>
    </Router>
      
  );
}

export default App;
