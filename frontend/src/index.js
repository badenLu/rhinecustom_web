import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //导入App组件
import './index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import {HelmetProvider} from "react-helmet-async";



//创建React根并挂载到#root节点
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);


