import { Card, Alert } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/**
 * TopReposBarChart Component
 * 
 * Purpose: Renders a horizontal bar chart of top repositories by stars.
 * Horizontal orientation chosen because repo names are often long.
 * 
 * @param {Array<{name: string, stars: number}>} data - Top repos sorted by stars.
 */
function TopReposBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Top Repositories by Stars</Card.Title>
          <Alert variant="info" className="mb-0">
            No repository data available.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Top Repositories by Stars</Card.Title>
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="stars" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default TopReposBarChart;