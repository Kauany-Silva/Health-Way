import React, { useState, useEffect } from 'react';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '487f96ec13ecce6cfba3c61b3f052358';

  useEffect(() => {
    // category=health → SÓ NOTÍCIAS DE SAÚDE
    fetch(`https://gnews.io/api/v4/top-headlines?category=health&lang=pt&max=12&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setNoticias(data.articles);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>📰 Carregando notícias...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1e3c72' }}>
        📰 Últimas Notícias
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {noticias.map((item, index) => (
          <div
            key={index}
            onClick={() => window.open(item.url, '_blank')}
            style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{item.title}</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '12px' }}>
                <span>{item.source?.name}</span>
                <span>🔗 Ler mais</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export  {Noticias};