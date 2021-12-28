import React from 'react';
import { Link } from 'react-router-dom';

const NoRoute = () => {
  return (
    <main style={{ padding: '1rem' }}>
      <p>There's nothing here!</p>
      <Link to="/movies">Back to home</Link>
    </main>
  );
};

export default NoRoute;
