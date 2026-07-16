import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Alert } from "react-bootstrap";

function ReadmeViewer({ content }) {
  if (!content) {
    return (
      <Alert variant="info" className="mt-3">
        No README available for this repository.
      </Alert>
    );
  }

  return (
    <div className="readme-content p-4 bg-light rounded">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default ReadmeViewer;