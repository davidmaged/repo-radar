import { NavBar } from '@repo-radar/ui';
import { Routes, Route } from 'react-router-dom';
import type { ILink } from '@repo-radar/ui';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './css/App.css';

export default function App() {
  const pages: ILink[] = [
    { label: 'Home', to: '/' },
    { label: 'Favorites', to: '/favorites' },
    { label: 'Dashboard', to: '/dashboard' },
  ];
  return (
    <>
      <NavBar pages={pages} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
