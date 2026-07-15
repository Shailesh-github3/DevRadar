import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

// The component receives 'value', 'onChange', and 'onSubmit' as props
function SearchBar({ value, onChange, onSubmit }) {
  
  // Handle the form submission
  const handleSubmit = (event) => {
    // Prevent the browser's default behavior (which is to reload the page)
    event.preventDefault(); 
    
    // Call the function passed down from the parent
    onSubmit(); 
  };

  return (
    // We use a <form> tag so the user can press "Enter" to search
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        
        {/* The input is "controlled" by the 'value' prop */}
        <Form.Control
          type="text"
          placeholder="Enter GitHub username (e.g., torvalds)"
          value={value}
          onChange={onChange}
          aria-label="GitHub username"
        />
        
        <Button variant="primary" type="submit">
          <Search className="me-2" size={18} />
          Search
        </Button>
        
      </InputGroup>
    </form>
  );
}

export default SearchBar;