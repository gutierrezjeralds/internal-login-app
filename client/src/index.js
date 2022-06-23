import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/Main';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './components/assets/sass/screen.scss'

const container = document.getElementById('root');
const root = createRoot(container);

// Render
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)