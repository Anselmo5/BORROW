import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createItemService } from "../../../services/items";
import { ErrorMessage } from "../../../components/ui/ErrorMessage/ErrorMessage";

export default function CreateItem() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await createItemService({
        name,
        category,
        description,
      });

      navigate("/items/my");
    } catch {
      setError("Não foi possível cadastrar o item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page"><header className="page-header"><div><Link className="back-link" to="/items/my">← Meus itens</Link><h1>Adicionar item</h1><p>Cadastre algo que você está disposto a emprestar.</p></div>
      </header>

      <form className="form-card form-stack" onSubmit={handleSubmit}>
        <div className="form-field"><label htmlFor="name">Nome</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Violão"
            required
          />
        </div>

        <div className="form-field"><label htmlFor="category">Categoria</label>

          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Ex: Música"
            required
          />
        </div>

        <div className="form-field"><label htmlFor="description">Descrição</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Conte um pouco sobre o item..."
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="form-actions"><Link className="button button--secondary" to="/items/my">Cancelar</Link><button className="button" type="submit" disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar item"}</button></div>
      </form>
    </main>
  );
}