import { useState } from "react";
import { ArrowRight, Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../../services/auth";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";
import "../Login/Login.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await registerService({ name, email, password });
      navigate("/login", { state: { registered: true } });
    } catch {
      setError("Não foi possível criar sua conta. Confira os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="login">
    <div className="login__container">
      <div className="login__brand"><span className="login__brand-mark">B</span><span>BORROW</span></div>
      <div className="login__header"><h1>Crie sua conta</h1><p>Comece a compartilhar o que você tem.</p></div>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field"><label htmlFor="name">Nome</label><div className="login__input-wrapper"><UserRound size={18} /><input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" required /></div></div>
        <div className="login__field"><label htmlFor="register-email">E-mail</label><div className="login__input-wrapper"><Mail size={18} /><input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" required /></div></div>
        <div className="login__field"><label htmlFor="register-password">Senha</label><div className="login__input-wrapper"><Lock size={18} /><input id="register-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Crie uma senha" minLength={6} required /></div></div>
        {error && <ErrorMessage message={error} />}
        <button type="submit" className="login__button" disabled={loading}>{loading ? "Cadastrando..." : "Criar conta"}<ArrowRight size={18} /></button>
      </form>
      <p className="login__register">Já possui uma conta? <Link to="/login">Entrar</Link></p>
    </div>
  </main>;
}