import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Conta</p>
          <h1>Meu perfil</h1>
          <p>Suas informações no BORROW.</p>
        </div>
      </header>

      <section className="form-card profile-details">
        <div>
          <span>Nome</span>
          <strong>{user?.name}</strong>
        </div>

        <div>
          <span>E-mail</span>
          <strong>{user?.email}</strong>
        </div>
      </section>

      <button className="button button--secondary" onClick={logout}>Sair da conta</button>
    </main>
  );
}