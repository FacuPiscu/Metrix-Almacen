
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './presentation/layouts/MainLayout';
import AuthLayout from './presentation/layouts/AuthLayout';

import Login from './presentation/pages/Login';
import Warehouses from './presentation/pages/Warehouses';
import WarehouseDetail from './presentation/pages/WarehouseDetail';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/warehouses/:id" element={<WarehouseDetail />} />
      </Route>

      <Route path="/" element={<Navigate to="/warehouses" replace />} />
      <Route path="*" element={<Navigate to="/warehouses" replace />} />
    </Routes>
  );
};

export default App;
