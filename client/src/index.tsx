import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/ui/views/Root';
import reportWebVitals from '@/reportWebVitals';
import './index.css';

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);

reportWebVitals();
