import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}