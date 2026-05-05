import React from 'react';
import { T } from '../theme';
import { LogOut, LayoutDashboard, School, Users, ClipboardList, Bell, Settings, Calendar, BookOpen, GraduationCap, Hand, BarChart3, ChevronRight, X, Check, AlertCircle, Clock } from 'lucide-react';

export const Badge = ({ color = "sky", children, small }) => {
  const colors = {
    sky: { bg: T.skyMuted, text: T.sky },
    green: { bg: T.greenMuted, text: T.green },
    amber: { bg: T.amberMuted, text: T.amber },
    red: { bg: T.redMuted, text: T.red },
    slate: { bg: "#F1F5F9", text: T.slate },
    navy: { bg: "#E8EFF8", text: T.navyMid },
  };
  const c = colors[color] || colors.sky;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: c.bg, color: c.text,
      fontSize: small ? 10 : 11, fontWeight: 600,
      padding: small ? "1px 6px" : "3px 10px",
      borderRadius: 4, letterSpacing: "0.02em", textTransform: "uppercase",
    }}>{children}</span>
  );
};

export const Btn = ({ variant = "primary", size = "md", onClick, children, disabled, full, icon }) => {
  const sizes = { sm: { padding: "6px 14px", fontSize: 12 }, md: { padding: "8px 18px", fontSize: 13 }, lg: { padding: "11px 24px", fontSize: 14 } };
  const variants = {
    primary: { bg: T.sky, color: "#fff", border: "none", hoverBg: T.skyLight },
    secondary: { bg: "transparent", color: T.sky, border: `1px solid ${T.sky}`, hoverBg: T.skyMuted },
    ghost: { bg: "transparent", color: T.textMid, border: `1px solid ${T.border}`, hoverBg: "#F1F5F9" },
    danger: { bg: T.red, color: "#fff", border: "none", hoverBg: "#B91C1C" },
    success: { bg: T.green, color: "#fff", border: "none", hoverBg: "#047857" },
  };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: v.bg, color: v.color, border: v.border,
      borderRadius: 10, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 8,
      width: full ? "100%" : "auto", justifyContent: "center",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", ...s,
      WebkitTapHighlightColor: 'transparent'
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = v.hoverBg; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = v.bg; }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children && <span className={icon ? "desktop-only" : ""}>{children}</span>}
    </button>
  );
};

export const Card = ({ children, style = {}, pad = 20, className = "", ...props }) => (
  <div className={`clickable ${className}`} style={{
    background: T.white, border: `1px solid ${T.border}`,
    borderRadius: 16, padding: pad, 
    boxShadow: '0 2px 12px rgba(0,0,0,0.02)', ...style,
  }} {...props}>{children}</div>
);

export const StatCard = ({ label, value, delta, color = "sky", icon: IconComponent }) => {
  const colors = { 
    sky: { bg: T.skyMuted, color: T.sky }, 
    green: { bg: T.greenMuted, color: T.green }, 
    amber: { bg: T.amberMuted, color: T.amber }, 
    red: { bg: T.redMuted, color: T.red } 
  };
  const c = colors[color] || colors.sky;
  return (
    <Card style={{ flex: 1, minWidth: 150, padding: 'clamp(14px, 4vw, 20px)' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: T.textMid, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</div>
          <div style={{ fontSize: 'clamp(20px, 6vw, 26px)', fontWeight: 800, color: T.text, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
          {delta !== undefined && (
            <div style={{ fontSize: 11, color: delta > 0 ? T.green : T.red, marginTop: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ padding: '2px 6px', borderRadius: 100, background: delta > 0 ? T.greenMuted : T.redMuted, display: 'flex', alignItems: 'center', gap: 2 }}>
                {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
              </div>
              <span style={{ color: T.textLight, fontWeight: 500 }}>vs last week</span>
            </div>
          )}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${c.color}15` }}>
          {IconComponent && <IconComponent size={20} />}
        </div>
      </div>
    </Card>
  );
};

export const FAB = ({ icon, onClick, label }) => (
  <button className="mobile-only" onClick={onClick} style={{
    position: 'fixed', bottom: 'calc(85px + var(--safe-area-inset-bottom))', right: 20,
    background: T.sky, color: '#fff', borderRadius: 28, padding: label ? '14px 22px' : '16px',
    display: 'flex', alignItems: 'center', gap: 10, border: 'none',
    boxShadow: '0 8px 24px rgba(14,165,233,0.4)', zIndex: 900,
    fontWeight: 700, fontSize: 14, transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  }}>
    {icon}
    {label && <span>{label}</span>}
  </button>
);

export const Table = ({ cols, rows, onRowClick }) => (
  <div style={{ width: "100%" }}>
    {/* Desktop View */}
    <div className="desktop-only" style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${T.border}` }}>
            {cols.map((c, i) => (
              <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: T.textMid, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} onClick={() => onRowClick && onRowClick(row)}
              style={{ borderBottom: `1px solid ${T.border}`, cursor: onRowClick ? "pointer" : "default", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "11px 14px", fontSize: 13, color: T.text, verticalAlign: "middle" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile View: List Cards */}
    <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {rows.map((row, i) => (
        <Card key={i} onClick={() => onRowClick && onRowClick(row)} style={{ 
          padding: 14, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 8,
          activeScale: 0.98,
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{row[1] || row[0]}</div>
            <div style={{ fontSize: 12 }}>{row[cols.length - 2]}</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {cols.slice(0, -1).map((col, idx) => (
              idx !== 1 && (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 10, color: T.textLight, textTransform: 'uppercase', fontWeight: 600 }}>{col}</div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{row[idx]}</div>
                </div>
              )
            ))}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const Sidebar = ({ items, active, onSelect, school, role }) => (
  <div className="desktop-only" style={{
    width: 220, minHeight: "100vh", background: T.navy, display: "flex", flexDirection: "column",
    position: "fixed", left: 0, top: 0, zIndex: 100,
  }}>
    <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${T.navyLight}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: T.sky, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
          <Calendar size={18} />
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1 }}>AttendEase</div>
          <div style={{ color: T.slateLight, fontSize: 10, marginTop: 2 }}>{role}</div>
        </div>
      </div>
      {school && (
        <div style={{ background: T.navyLight, borderRadius: 7, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: T.sky, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {school.initials}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 11, fontWeight: 500, lineHeight: 1.3 }}>{school.name}</div>
            <div style={{ color: T.slateLight, fontSize: 10 }}>{school.plan}</div>
          </div>
        </div>
      )}
    </div>
    <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
      {items.map((item, i) => (
        item.divider
          ? <div key={i} style={{ height: 1, background: T.navyLight, margin: "8px 8px" }} />
          : <button key={i} onClick={() => onSelect(item.id)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 7, marginBottom: 1,
              background: active === item.id ? T.sky : "transparent",
              color: active === item.id ? "#fff" : T.slateLight,
              fontSize: 13, fontWeight: active === item.id ? 500 : 400,
              border: "none", cursor: "pointer", textAlign: "left",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = T.navyLight; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.slateLight; } }}
          >
            <span style={{ display: "flex", alignItems: "center", width: 18, justifyContent: "center" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.badge && <span style={{ marginLeft: "auto", background: T.red, color: "#fff", borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{item.badge}</span>}
          </button>
      ))}
    </nav>
    <div style={{ padding: "14px 18px", borderTop: `1px solid ${T.navyLight}` }}>
      <div style={{ color: T.slateLight, fontSize: 11, lineHeight: 1.5 }}>Academic Year<br />
        <span style={{ color: "#fff", fontWeight: 500 }}>2025 – 2026</span>
      </div>
    </div>
  </div>
);

export const BottomNav = ({ items, active, onSelect }) => (
  <div className="mobile-only" style={{
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
    borderTop: `1px solid ${T.border}`,
    display: 'flex', justifyContent: 'space-around',
    padding: '8px 4px calc(12px + var(--safe-area-inset-bottom))',
    zIndex: 1000,
    boxShadow: '0 -10px 30px rgba(0,0,0,0.03)'
  }}>
    {items.filter(i => !i.divider).slice(0, 5).map((item, i) => (
      <button key={i} onClick={() => onSelect(item.id)} style={{
        background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 3, color: active === item.id ? T.sky : T.textMid,
        flex: 1, padding: '4px 0', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative',
        WebkitTapHighlightColor: 'transparent'
      }}>
        {active === item.id && (
          <div style={{ 
            position: 'absolute', top: -8, width: 24, height: 2, 
            background: T.sky, borderRadius: 2, animation: 'scaleIn 0.3s ease'
          }} />
        )}
        <div style={{ 
          color: active === item.id ? T.sky : T.textMid,
          transform: active === item.id ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
          transition: 'all 0.3s'
        }}>
          {item.icon}
        </div>
        <span style={{ fontSize: 10, fontWeight: active === item.id ? 700 : 500, letterSpacing: '0.01em' }}>{item.label}</span>
        {item.badge && (
          <span style={{ 
            position: 'absolute', top: -2, right: '22%', 
            background: T.red, color: '#fff', borderRadius: 10, 
            fontSize: 9, fontWeight: 700, padding: '2px 5px',
            border: '2px solid #fff', boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
          }}>{item.badge}</span>
        )}
      </button>
    ))}
  </div>
);

export const TopBar = ({ title, subtitle, actions, user }) => (
  <div style={{
    height: 64, background: T.white, borderBottom: `1px solid ${T.border}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 18px", position: "sticky", top: 0, zIndex: 50,
    marginTop: 'var(--safe-area-inset-top)'
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{title}</div>
      {subtitle && <div className="desktop-only" style={{ fontSize: 12, color: T.textMid }}>{subtitle}</div>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {actions}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 6 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${T.sky}, ${T.skyLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: '0 4px 10px rgba(14,165,233,0.2)' }}>
            {user.initials}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const AttendanceDot = ({ status }) => {
  const map = { P: { bg: T.green, label: "P" }, A: { bg: T.red, label: "A" }, L: { bg: T.amber, label: "L" }, H: { bg: "#7C3AED", label: "H" }, "–": { bg: T.border, label: "–" } };
  const m = map[status] || map["–"];
  return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800, boxShadow: `0 3px 8px ${m.bg}33` }}>{m.label}</div>
  );
};

export const AttendancePct = ({ pct }) => {
  const color = pct >= 80 ? T.green : pct >= 65 ? T.amber : T.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, maxWidth: 80, height: 5, background: T.border, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 10 }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{pct}%</span>
    </div>
  );
};

export const Modal = ({ title, onClose, children }) => (
  <div style={{ 
    position: "fixed", inset: 0, background: "rgba(15,28,46,0.4)", zIndex: 2000, 
    display: "flex", alignItems: "flex-end", justifyContent: "center",
    backdropFilter: 'blur(4px)', animation: 'fadeIn 0.3s ease'
  }}>
    <div className="bottom-sheet" style={{ 
      background: T.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, 
      width: "100%", maxWidth: 600, maxHeight: "90vh", overflow: "hidden", 
      display: 'flex', flexDirection: 'column',
      boxShadow: "0 -10px 40px rgba(0,0,0,0.1)",
      animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{ width: 40, height: 4, background: T.border, borderRadius: 2, margin: '12px auto 4px' }} />
      <div style={{ padding: "16px 24px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
        <button onClick={onClose} style={{ background: T.surface, border: "none", cursor: "pointer", color: T.textMid, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></button>
      </div>
      <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>{children}</div>
    </div>
    <style>{`
      @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      @keyframes scaleIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      @media (min-width: 769px) {
        .bottom-sheet { border-radius: 16px !important; margin-bottom: 5vh; width: 500px !important; }
      }
    `}</style>
  </div>
);

export const FormField = ({ label, type = "text", value, onChange, options, required }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 8 }}>{label}{required && <span style={{ color: T.red }}> *</span>}</label>
    {type === "select" ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: `2px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.text, background: T.white, appearance: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} style={{ width: "100%", padding: "12px 14px", border: `2px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.text, resize: "none", outline: "none" }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: `2px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.text, outline: "none" }} />
    )}
  </div>
);
