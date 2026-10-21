import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AppLayout.css";

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <div className="app-layout__brand">BORROW</div>

        <nav className="app-layout__nav">
          <NavLink to="/">Dashboard</NavLink>

          <NavLink to="/items">Explorar itens</NavLink>

          <NavLink to="/items/my">Meus itens</NavLink>

          <NavLink to="/items/create">Adicionar item</NavLink>

          <NavLink to="/loans">Empréstimos</NavLink>

          <NavLink to="/profile">Perfil</NavLink>
        </nav>

        <div className="app-layout__user">
          <span>{user?.name}</span>

          <button onClick={logout}>Sair</button>
        </div>
      </aside>

      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
