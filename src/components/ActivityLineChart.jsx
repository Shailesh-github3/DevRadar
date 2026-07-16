import { Card, Alert } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/**
 * ActivityLineChart Component
 * 
 * Purpose: Renders a line chart showing repository creation activity over time.
 * 
 * @param {Array<{month: string, count: number}>} data - Monthly repo creation counts.
 */
function ActivityLineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Repository Creation Activity</Card.Title>
          <Alert variant="info" className="mb-0">
            No activity data available.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Repository Creation Activity</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0d6efd"
              strokeWidth={2}
              dot={{ fill: '#0d6efd', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default ActivityLineChart;