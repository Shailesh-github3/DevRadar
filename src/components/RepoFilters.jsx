import { Form, Row, Col } from "react-bootstrap";

function RepoFilters({
  searchText,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedLanguage,
  onLanguageChange,
  availableLanguages,
}) {
  return (
    <Row className="mb-3 g-2">
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Filter by name..."
          value={searchText}
          onChange={onSearchChange}
        />
      </Col>

      <Col md={4}>
        <Form.Select value={sortBy} onChange={onSortChange}>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="updated">Recently Updated</option>
          <option value="name">Name (A-Z)</option>
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Select
          value={selectedLanguage}
          onChange={onLanguageChange}
        >
          <option value="">All Languages</option>
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default RepoFilters;