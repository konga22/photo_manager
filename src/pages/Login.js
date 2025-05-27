import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 네이버 로그인 페이지 열기
    window.open('https://nid.naver.com/nidlogin.login', 'naverLogin', 
      'width=500,height=600,left=200,top=200');
    
    // 에디터 페이지로 이동
    navigate('/editor');
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: 20,
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ color: '#03c75a', textAlign: 'center', marginBottom: 30 }}>
        네이버 블로그 자동 포스팅
      </h2>
      
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleLogin}
          style={{
            background: '#03c75a',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '12px 24px',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          네이버 로그인
        </button>
      </div>
    </div>
  );
}

export default Login; 