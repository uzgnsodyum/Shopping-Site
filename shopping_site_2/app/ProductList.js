import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <div className="text-center my-5">Loading products...</div>;
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        Error loading products: {error.message}
      </Alert>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Alert variant="info" className="my-4">
        No products found. Try a different search.
      </Alert>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map(product => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;