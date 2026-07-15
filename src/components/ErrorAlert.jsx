import { Alert } from 'react-bootstrap';

/**
 * ErrorAlert Component
 * 
 * Purpose: A reusable, presentational component to display error messages.
 * Analogy: A standardized error view template. It receives a formatted error 
 * message from the Controller and renders it. It does not determine the 
 * error type or fetch error details itself.
 * 
 * Props:
 * - message (string): The error text to display.
 * - variant (string, optional): Bootstrap alert variant (e.g., 'danger', 'warning'). Defaults to 'danger'.
 */
function ErrorAlert({ message, variant = 'danger' }) {
  // Trivial guard clause: do not render an empty alert box.
  if (!message) {
    return null;
  }

  return (
    <Alert variant={variant} role="alert">
      {message}
    </Alert>
  );
}

export default ErrorAlert;