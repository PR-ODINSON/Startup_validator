import React from 'react';

export default function Footer({ contactEmail }) {
  return (
    <footer style={{
      background: '#2563eb',
      color: '#fff',
      textAlign: 'center',
      padding: '24px 0',
      marginTop: 32
    }}>
      <div>
        &copy; {new Date().getFullYear()} Startup Validator &mdash; Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#fff', textDecoration: 'underline' }}>{contactEmail}</a>
      </div>
    </footer>
  );
}