import { Card, Alert } from 'react-bootstrap';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

// Fixed color palette for consistent branding
const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#0dcaf0', '#fd7e14', '#20c997'];

function LanguagePieChart({ data }) {
  // Guard clause for empty data
  if (!data || data.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Language Distribution</Card.Title>
          <Alert variant="info" className="mb-0">
            No language data available.
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Language Distribution</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              // IMPORTANT: These keys MUST match the properties in your data objects.
              // If your utils output {language, count}, change these to "language" and "count".
              dataKey="value" 
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            {/* Added dataKey="name" so the legend shows the language, not "value" */}
            <Legend dataKey="name" /> 
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default LanguagePieChart;