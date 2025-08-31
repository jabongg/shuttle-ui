import React from 'react';
import PropTypes from 'prop-types';

const Court = ({ image, name, details }) => {
    return (
        <div style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <div style={styles.content}>
                <h3 style={styles.name}>{name}</h3>
                <p style={styles.details}>{details}</p>
            </div>
        </div>
    );
};

Court.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '16px',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    content: {
        padding: '16px',
    },
    name: {
        margin: '0 0 8px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    details: {
        margin: '0',
        fontSize: '14px',
        color: '#555',
    },
};

export default Court;