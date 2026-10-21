import './Loading.css';       

interface LoadingProps {
  message?: string;
}

export function Loading({
  message = "Carregando...",
}: LoadingProps) {
  return (
    <div className="loading">
      <span className="loading__spinner" />
      <p>{message}</p>
    </div>
  );
}