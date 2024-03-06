import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = {
  token: {
    colorPrimary: '#FFCD1C',
    colorBgLayout: 'linear-gradient(to left, #FFCD1C, #FF5733)',
    colorTextPlaceholder: 'silver.200',
    colorBgInput: 'white',
    addonBg: 'white',
  },
  components: {
    Button: {
      algorithm: true,
      colorText: 'black',
    },
  },
};
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
