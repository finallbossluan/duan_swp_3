import React from 'react';

function Logo() {
  const styles = {  
    image: {
      width: '50px', // Adjust the size of the logo
      height: 'auto',
      marginRight: '15px',
      display: 'inline-block'
    },
    title: {
        height: '30px',
      fontSize: '25px',
      fontWeight: 'bold',
      color: '#6b5b95', // Soft purple text color
      fontFamily: 'Arial, sans-serif', // Simple, clean font
      textTransform: 'uppercase',
      marginBottom: '2px',
      display: 'inline-block',
      position: 'relative',
        top: '5px'
    },
  };

  return (
    <div style={styles.container}>
      <img src={require('../assest/logoweb.webp')} alt="E-commerce Logo" style={styles.image} />
      <h1 style={styles.title}>E-commerce</h1>
    </div>
  );
}

export default Logo;
