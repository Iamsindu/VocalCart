import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products');
        const categorized = res.data.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductsByCategory(categorized);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const styles = {
    page: {
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f9f9f9',
    },
    mainTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#333',
    },
    categoryBlock: {
      marginBottom: '40px',
    },
    categoryTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px',
      borderBottom: '2px solid #ddd',
      paddingBottom: '8px',
      color: '#444',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginBottom: '10px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '6px',
      color: '#222',
    },
    description: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
    },
    price: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#008000',
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.mainTitle}>Shop by Category</h1>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} style={styles.categoryBlock}>
        <h2 style={styles.categoryTitle}>{category}</h2>
        <div style={styles.productGrid}>
         {products.slice(0, 5).map(product => (
          <Link 
           to={`/product/${product._id}`} 
           key={product._id} 
            style={{ textDecoration: 'none', color: 'inherit' }}
        > 
          <div style={styles.card}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={styles.image}
            />
            <h3 style={styles.title}>{product.title}</h3>
            <div>
              <p style={styles.description}><strong>Details:</strong> {product.product_description}</p>
              <p style={styles.price}><strong>Price:</strong> ${product.final_price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <div style={{ marginTop: '10px', textAlign: 'right' }}>
      <Link 
        to={`/category/${encodeURIComponent(category)}`} 
        style={{ color: '#007BFF', textDecoration: 'underline', fontWeight: '500' }}
      >
        View More →
      </Link>
    </div>
  </div>
))}

</div>
  );
};

export default Shop;
