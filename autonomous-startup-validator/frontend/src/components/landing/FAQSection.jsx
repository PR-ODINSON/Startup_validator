import React, { useState } from 'react';

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);

  if (!faqs) return null;
  return (
    <section id="faqs" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>FAQs</h2>
      <div>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px #2563eb11',
            padding: 20,
            marginBottom: 12,
            cursor: 'pointer'
          }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 18 }}>{faq.q}</div>
            {open === i && <div style={{ color: '#52525b', fontSize: 16, marginTop: 8 }}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}