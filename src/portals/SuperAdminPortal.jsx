import React, { useState } from 'react';
import { T } from '../theme';
import { Sidebar, BottomNav, TopBar, StatCard, Card, Btn, Table, Badge, Modal, FormField, FAB } from '../components/Shared';
import { SCHOOLS } from '../data';
import { LayoutDashboard, School, Users, ClipboardList, Bell, Settings, LogOut, PlusCircle, ExternalLink, Activity, Plus } from 'lucide-react';

const SADashboard = ({ setPage }) => (
  <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(12px, 3vw, 20px)', marginBottom: 24 }}>
      <StatCard label="Total Schools" value="42" delta={12} color="sky" icon={School} />
      <StatCard label="Total Students" value="7,320" delta={8} color="green" icon={Users} />
      <StatCard label="Active Teachers" value="354" delta={5} color="amber" icon={ClipboardList} />
      <StatCard label="Monthly Revenue" value="₹82,900" delta={12} color="sky" icon={Activity} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginBottom: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, alignItems: "center" }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Schools Overview</div>
          <Btn variant="ghost" size="sm" onClick={() => setPage("schools")}>View all</Btn>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {SCHOOLS.map(s => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: T.skyMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.sky, flexShrink: 0 }}>{s.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: T.textMid }}>{s.city} &bull; {s.students} students</div>
              </div>
              <Badge color={s.status === "active" ? "green" : "amber"}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Platform Health</div>
        {[
          { label: "Trial accounts expiring", count: 1, color: "amber" },
          { label: "SMS delivery success", count: "98%", color: "green" },
          { label: "Pending school onboarding", count: 2, color: "sky" },
          { label: "Domain verification issues", count: 0, color: "green" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 13, color: T.textMid }}>{a.label}</span>
            <Badge color={a.color}>{a.count}</Badge>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const SuperAdminPortal = ({ onLogout }) => {
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const user = { name: "Vikram Shetty", initials: "VS", role: "Platform Owner" };

  const nav = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "schools", icon: <School size={18} />, label: "Schools", badge: 3 },
    { id: "users", icon: <Users size={18} />, label: "Platform Users" },
    { id: "plans", icon: <ClipboardList size={18} />, label: "Plans & Billing" },
    { id: "notifications", icon: <Bell size={18} />, label: "Notifications" },
    { divider: true },
    { id: "settings", icon: <Settings size={18} />, label: "Platform Settings" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={nav} active={page} onSelect={setPage} role="Super Admin" />
      <BottomNav items={nav} active={page} onSelect={setPage} />
      
      {page === 'schools' && <FAB icon={<Plus size={24} />} label="Add School" onClick={() => setModal({})} />}

      <div className="portal-content">
        <TopBar
          title={nav.find(n => n.id === page)?.label || "Dashboard"}
          subtitle="Platform Management Console"
          user={user}
          actions={<Btn variant="ghost" size="sm" onClick={onLogout} icon={<LogOut size={14} />}>Sign out</Btn>}
        />
        <div className="portal-padding">
          {page === "dashboard" && <SADashboard setPage={setPage} />}
          {page === "schools" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: T.textMid }}>{SCHOOLS.length} schools registered</div>
                <Btn variant="primary" size="sm" icon={<PlusCircle size={16} />}>Onboard School</Btn>
              </div>
              <Card pad={0}>
                <Table
                  cols={["School", "City", "Plan", "Students", "Domain", "Status", "Actions"]}
                  rows={SCHOOLS.map(s => [
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 7, background: T.skyMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.sky }}>{s.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: T.textMid }}>Since {s.joined}</div>
                      </div>
                    </div>,
                    s.city,
                    <Badge color="sky">{s.plan}</Badge>,
                    s.students.toLocaleString(),
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: T.textMid }}>{s.domain}</span>,
                    <Badge color={s.status === "active" ? "green" : "amber"}>{s.status}</Badge>,
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn variant="ghost" size="sm" onClick={() => setModal(s)}>View</Btn>
                      <Btn variant="secondary" size="sm" icon={<ExternalLink size={12} />}>Login</Btn>
                    </div>,
                  ])}
                />
              </Card>
            </div>
          )}
          {page === "users" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: T.textMid }}>Active system administrators</div>
                <Btn variant="primary" size="sm" icon={<PlusCircle size={16} />}>Add Admin</Btn>
              </div>
              <Card pad={0}>
                <Table 
                  cols={["Name", "Role", "Last Login", "Activity", "Status", "Actions"]}
                  rows={[
                    ["Vikram Shetty", <Badge color="sky">Super Admin</Badge>, "Today, 10:45 AM", "98%", <Badge color="green">Active</Badge>, <Btn variant="ghost" size="sm">Edit</Btn>],
                    ["Sameer Khan", <Badge color="slate">Support Level 1</Badge>, "Yesterday", "82%", <Badge color="green">Active</Badge>, <Btn variant="ghost" size="sm">Edit</Btn>],
                    ["Neha Gupta", <Badge color="slate">Billing Admin</Badge>, "2 days ago", "45%", <Badge color="amber">Idle</Badge>, <Btn variant="ghost" size="sm">Edit</Btn>],
                  ]}
                />
              </Card>
            </div>
          )}
          {page === "plans" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 24 }}>
                {[
                  { name: "Starter", price: "₹2,500", features: ["Up to 200 students", "Basic Attendance", "SMS Alerts"], color: T.slate },
                  { name: "Growth", price: "₹7,500", features: ["Up to 1500 students", "Full Analytics", "Custom Branding"], color: T.sky },
                  { name: "Enterprise", price: "Custom", features: ["Unlimited students", "Dedicated Support", "API Access"], color: T.navy },
                ].map(p => (
                  <Card key={p.name} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: T.sky, marginBottom: 20 }}>{p.price}/mo</div>
                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                      {p.features.map(f => <div key={f} style={{ fontSize: 13, color: T.textMid, padding: '4px 0' }}>• {f}</div>)}
                    </div>
                    <Btn variant="ghost" full>Edit Plan</Btn>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {page === "notifications" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <Card pad={0}>
                <div style={{ padding: 20, fontWeight: 600, borderBottom: `1px solid ${T.border}` }}>System Announcements</div>
                <div style={{ padding: 20 }}>
                  <div style={{ background: T.surface, padding: 16, borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Scheduled Maintenance</div>
                    <p style={{ fontSize: 13, color: T.textMid, marginTop: 4 }}>System will be down for 2 hours on Sunday 02:00 AM IST for database optimization.</p>
                  </div>
                  <Btn variant="primary" size="sm">New Announcement</Btn>
                </div>
              </Card>
            </div>
          )}
          {page === "settings" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <Card>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>General Configuration</div>
                <div style={{ maxWidth: 500 }}>
                  <FormField label="Platform Name" value="AttendEase" />
                  <FormField label="Support Email" value="support@attendease.com" />
                  <FormField label="System Currency" type="select" options={[{value: "INR", label: "INR (₹)"}, {value: "USD", label: "USD ($)"}]} value="INR" />
                  <Btn variant="primary" style={{ marginTop: 10 }}>Save Changes</Btn>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <Modal title={modal.name} onClose={() => setModal(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Plan", modal.plan], ["City", modal.city], ["Students", modal.students], ["Teachers", modal.teachers], ["Status", modal.status], ["Domain", modal.domain], ["Joined", modal.joined]].map(([k, v]) => (
              <div key={k} style={{ background: T.surface, borderRadius: 8, padding: "12px" }}>
                <div style={{ fontSize: 11, color: T.textMid, marginBottom: 4, fontWeight: 500 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <Btn variant="primary" full>Impersonate Admin</Btn>
            <Btn variant="ghost" full onClick={() => setModal(null)}>Close</Btn>
          </div>
        </Modal>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminPortal;
