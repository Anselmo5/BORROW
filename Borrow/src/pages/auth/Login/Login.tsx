import { useState } from "react";
import { ArrowRight, Camera, Gamepad2, Guitar, Lock, Mail } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await login(email, password);

      navigate("/");
    } catch {
      setError("Não foi possível entrar. Confira seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login">
      <div className="login__floating-item login__floating-item--guitar">
        <div className="login__floating-icon">
          <Guitar size={22} />
        </div>

        <div>
          <strong>Violão</strong>
          <span>Disponível</span>
        </div>
      </div>

      <div className="login__floating-item login__floating-item--camera">
        <div className="login__floating-icon">
          <Camera size={22} />
        </div>

        <div>
          <strong>Câmera</strong>
          <span>Emprestada</span>
        </div>
      </div>

      <div className="login__floating-item login__floating-item--game">
        <div className="login__floating-icon">
          <Gamepad2 size={22} />
        </div>

        <div>
          <strong>Controle</strong>
          <span>Disponível</span>
        </div>
      </div>

      <div className="login__container">
        <div className="login__brand">
          <span className="login__brand-mark">B</span>
          <span>BORROW</span>
        </div>

        <div className="login__header">
          <h1>Bem-vindo de volta</h1>

          <p>Entre na sua conta para continuar compartilhando.</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label htmlFor="email">Email</label>

            <div className="login__input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="login__field">
            <div className="login__label-row">
              <label htmlFor="password">Senha</label>

              <a href="#">Esqueceu a senha?</a>
            </div>

            <div className="login__input-wrapper">
              <Lock size={18} />

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {error && <ErrorMessage message={error} />}
          <button type="submit" className="login__button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="login__register">
          Ainda não possui uma conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </main>
  );
}
