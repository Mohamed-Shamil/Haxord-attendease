import React, { useState, useEffect } from 'react';
import { T } from './theme';
import { Btn, Card } from './components/Shared';
import { Calendar, Shield, School, User, GraduationCap, ChevronRight } from 'lucide-react';

// Portals (to be implemented/imported)
import SuperAdminPortal from './portals/SuperAdminPortal';
import SchoolAdminPortal from './portals/SchoolAdminPortal';
import TeacherPortal from './portals/TeacherPortal';
import StudentPortal from './portals/StudentPortal';

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      background: ${T.surface}; 
      color: ${T.text};
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.borderDark}; border-radius: 10px; }
    button { font-family: inherit; cursor: pointer; border: none; outline: none; }
    input, select, textarea { font-family: inherit; outline: none; }
    a { text-decoration: none; color: inherit; }
  `}</style>
);

const LoginScreen = ({ onLogin }) => {
  const roles = [
    { id: 'super', title: 'Super Admin', desc: 'Platform Management', icon: Shield, color: T.navy },
    { id: 'admin', title: 'School Admin', desc: 'Institutional Control', icon: School, color: T.sky },
    { id: 'teacher', title: 'Teacher', desc: 'Classroom & Attendance', icon: User, color: T.green },
    { id: 'student', title: 'Student / Parent', desc: 'Track Progress', icon: GraduationCap, color: T.amber },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`,
      padding: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: T.sky, filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: T.green, filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%' }} />

      <div style={{ width: '100%', maxWidth: 900, zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 12, 
            background: 'rgba(255,255,255,0.05)', 
            padding: '8px 16px', 
            borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 20
          }}>
            <Calendar size={20} color={T.skyLight} />
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em' }}>ATTENDEASE V2.0</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Smart Attendance Management
          </h1>
          <p style={{ color: T.slateLight, fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
            Unified platform for schools, teachers, and students to manage academic life seamlessly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {roles.map((role) => (
            <Card 
              key={role.id} 
              style={{ 
                cursor: 'pointer', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = role.color;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${role.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => onLogin(role.id)}
            >
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 16, 
                background: `${role.color}1A`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: role.color,
                marginBottom: 20,
                border: `1px solid ${role.color}33`
              }}>
                <role.icon size={28} />
              </div>
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{role.title}</h3>
              <p style={{ color: T.slateLight, fontSize: 13, marginBottom: 20 }}>{role.desc}</p>
              <div style={{ 
                marginTop: 'auto', 
                color: role.color, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 4, 
                fontSize: 13, 
                fontWeight: 600 
              }}>
                Access Portal <ChevronRight size={16} />
              </div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ color: T.slateLight, fontSize: 12 }}>
            Powered by <span style={{ color: '#fff', fontWeight: 600 }}>HXRD TECH</span> &bull; &copy; 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <>
      <GlobalStyle />
      {!role && <LoginScreen onLogin={handleLogin} />}
      {role === 'super' && <SuperAdminPortal onLogout={handleLogout} />}
      {role === 'admin' && <SchoolAdminPortal onLogout={handleLogout} />}
      {role === 'teacher' && <TeacherPortal onLogout={handleLogout} />}
      {role === 'student' && <StudentPortal onLogout={handleLogout} />}
    </>
  );
}

export default App;
