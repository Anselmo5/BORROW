import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import ExploreItems from "../pages/items/ExploreItems/ExploreItems";
import ItemDetails from "../pages/items/ItemDetails/ItemDetails";
import MyItems from "../pages/items/MyItems/MyItems";
import CreateItem from "../pages/items/CreateItem/CreateItem";

import Loans from "../pages/loans/Loans";
import Profile from "../pages/profile/Profile";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="route-loading">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
}

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/items" element={<ExploreItems />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/items/my" element={<MyItems />} />
        <Route path="/items/create" element={<CreateItem />} />

        <Route path="/loans" element={<Loans />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}