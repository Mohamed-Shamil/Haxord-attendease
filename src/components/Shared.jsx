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
      borderRadius: 6, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 6,
      width: full ? "100%" : "auto", justifyContent: "center",
      transition: "all 0.15s", ...s,
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = v.hoverBg; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = v.bg; }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </button>
  );
};

export const Card = ({ children, style = {}, pad = 20, ...props }) => (
  <div style={{
    background: T.white, border: `1px solid ${T.border}`,
    borderRadius: 10, padding: pad, ...style,
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
    <Card style={{ flex: 1, minWidth: 140 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: T.textMid, fontWeight: 500, marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: T.text, letterSpacing: "-0.02em" }}>{value}</div>
          {delta !== undefined && <div style={{ fontSize: 11, color: delta > 0 ? T.green : T.red, marginTop: 4, fontWeight: 500 }}>
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}% vs last month
          </div>}
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {IconComponent && <IconComponent size={18} />}
        </div>
      </div>
    </Card>
  );
};

export const Table = ({ cols, rows, onRowClick }) => (
  <div style={{ overflowX: "auto" }}>
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
);

export const Sidebar = ({ items, active, onSelect, school, role }) => (
  <div style={{
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

export const TopBar = ({ title, subtitle, actions, user }) => (
  <div style={{
    height: 60, background: T.white, borderBottom: `1px solid ${T.border}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 28px", position: "sticky", top: 0, zIndex: 50,
  }}>
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: T.textMid }}>{subtitle}</div>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {actions}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.skyMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: T.sky }}>
            {user.initials}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: T.text }}>{user.name}</div>
            <div style={{ fontSize: 11, color: T.textMid }}>{user.role}</div>
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
    <div style={{ width: 26, height: 26, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>{m.label}</div>
  );
};

export const AttendancePct = ({ pct }) => {
  const color = pct >= 80 ? T.green : pct >= 65 ? T.amber : T.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 60, height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color }}>{pct}%</span>
    </div>
  );
};

export const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(15,28,46,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ background: T.white, borderRadius: 12, width: 500, maxHeight: "85vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMid }}><X size={20} /></button>
      </div>
      <div style={{ padding: 22 }}>{children}</div>
    </div>
  </div>
);

export const FormField = ({ label, type = "text", value, onChange, options, required }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: T.textMid, marginBottom: 5 }}>{label}{required && <span style={{ color: T.red }}> *</span>}</label>
    {type === "select" ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 13, color: T.text, background: T.white }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 13, color: T.text, resize: "vertical", outline: "none" }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 13, color: T.text, outline: "none" }} />
    )}
  </div>
);
