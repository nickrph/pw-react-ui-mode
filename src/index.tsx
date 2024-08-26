import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  return <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <img src='./creampuff.webp' style={{
      height: '100%',
    }} />
  </div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);