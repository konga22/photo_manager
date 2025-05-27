import React from 'react';

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f6fa',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: 800,
        width: '100%',
        background: '#fff',
        borderRadius: 16,
        padding: 40,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ 
          marginBottom: 40, 
          textAlign: 'center',
          color: '#03c75a',
          fontSize: 32
        }}>
          네이버 블로그 자동화
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 40
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: 24,
            borderRadius: 12,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
            <h3 style={{ marginBottom: 12 }}>사진 업로드</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              드래그 앤 드롭으로<br />
              여러 장의 사진을 한 번에 업로드
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: 24,
            borderRadius: 12,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
            <h3 style={{ marginBottom: 12 }}>위치 정보</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              EXIF 데이터에서<br />
              위치 정보 자동 추출
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: 24,
            borderRadius: 12,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
            <h3 style={{ marginBottom: 12 }}>자동화</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              블로그 포스팅을 위한<br />
              자동화 데이터 생성
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: 24,
            borderRadius: 12,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h3 style={{ marginBottom: 12 }}>블로그 포스팅</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              블로그 글쓰기 창<br />
              자동으로 열기
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => window.location.href = '/editor'}
            style={{
              background: '#03c75a',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '16px 48px',
              fontSize: 20,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(3,199,90,0.2)',
              transition: 'all 0.2s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(3,199,90,0.3)'
              }
            }}
          >
            시작하기
          </button>
        </div>

        <div style={{
          marginTop: 40,
          color: '#888',
          fontSize: 15,
          textAlign: 'center',
          lineHeight: 1.6,
          borderTop: '1px solid #eee',
          paddingTop: 24
        }}>
          <p style={{ marginBottom: 8 }}>
            사진을 업로드하고 블로그 자동화 데이터를 내보낼 수 있습니다.
          </p>
          <p style={{ fontSize: 13 }}>
            * 네이버 블로그 글쓰기 창에서 자동화 데이터를 활용하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;