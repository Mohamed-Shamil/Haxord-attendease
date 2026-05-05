import React, { useState } from 'react';
import { T } from '../theme';
import { Sidebar, BottomNav, TopBar, StatCard, Card, Btn, Table, Badge, AttendancePct, AttendanceDot, Modal, FormField, FAB } from '../components/Shared';
import { STUDENTS, TEACHERS, CLASSES, NOTIFICATIONS } from '../data';
import { LayoutDashboard, Calendar, Users, GraduationCap, School, Hand, BarChart3, Bell, Palette, Settings, LogOut, Search, Plus, Filter, Download } from 'lucide-react';

const AdminDashboard = ({ setPage }) => (
  <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
    <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
      <StatCard label="Total Students" value="1,240" delta={3} color="sky" icon={Users} />
      <StatCard label="Present Today" value="1,148" delta={2} color="green" icon={GraduationCap} />
      <StatCard label="Absent Today" value="92" color="red" icon={Users} />
      <StatCard label="Avg Attendance" value="87.3%" delta={1} color="amber" icon={BarChart3} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18, marginBottom: 20 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Class-wise Attendance (Today)</div>
          <Btn variant="ghost" size="sm" onClick={() => setPage("attendance")}>Full View</Btn>
        </div>
        {[["X-A", 38, 40], ["X-B", 35, 40], ["IX-A", 41, 42], ["IX-B", 38, 42], ["XII-A", 30, 34]].map(([cls, present, total]) => (
          <div key={cls} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 50, fontSize: 12, fontWeight: 700, color: T.textMid }}>{cls}</div>
            <div style={{ flex: 1, height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${(present / total) * 100}%`, height: "100%", background: (present / total) > 0.8 ? T.green : T.amber, borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: 12, color: T.textMid, minWidth: 80, textAlign: "right", fontWeight: 600 }}>{present}/{total} &bull; {Math.round(present / total * 100)}%</div>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Recent Alerts</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }}>
              <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: n.read ? T.textMid : T.text }}>{n.title}</div>
              <div style={{ fontSize: 11, color: T.textLight, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={10} /> {n.time}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Btn variant="ghost" size="sm" full>View all alerts</Btn>
        </div>
      </Card>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Low Attendance Watchlist</div>
        {STUDENTS.filter(s => s.attendance < 75).map(s => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>{s.class} &bull; Roll: {s.roll}</div>
            </div>
            <AttendancePct pct={s.attendance} />
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Mark Holiday", icon: Calendar, color: T.amber },
            { label: "Send Circular", icon: Bell, color: T.sky },
            { label: "Export Data", icon: Download, color: T.green },
            { label: "Add Student", icon: Plus, color: T.sky },
          ].map(a => (
            <button key={a.label} style={{ 
              background: T.surface, 
              border: `1px solid ${T.border}`, 
              borderRadius: 10, 
              padding: "16px 12px", 
              cursor: "pointer", 
              textAlign: "left", 
              display: "flex", 
              flexDirection: 'column',
              gap: 8, 
              transition: 'all 0.2s' 
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = a.color;
                e.currentTarget.style.background = `${a.color}05`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background = T.surface;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ color: a.color }}><a.icon size={20} /></div>
              <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const SchoolAdminPortal = ({ onLogout }) => {
  const [page, setPage] = useState("dashboard");
  const school = { name: "St. Mary's Public School", initials: "SM", plan: "Growth" };
  const user = { name: "Rohan Nair", initials: "RN", role: "School Admin" };

  const nav = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "attendance", icon: <Calendar size={18} />, label: "Attendance" },
    { id: "students", icon: <Users size={18} />, label: "Students" },
    { id: "teachers", icon: <GraduationCap size={18} />, label: "Teachers" },
    { id: "classes", icon: <School size={18} />, label: "Classes" },
    { id: "leaves", icon: <Hand size={18} />, label: "Leaves", badge: 4 },
    { id: "reports", icon: <BarChart3 size={18} />, label: "Reports" },
    { divider: true },
    { id: "branding", icon: <Palette size={18} />, label: "Branding" },
    { id: "settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={nav} active={page} onSelect={setPage} school={school} role="School Admin" />
      <BottomNav items={nav} active={page} onSelect={setPage} />
      
      {page === 'students' && <FAB icon={<Plus size={24} />} label="Add Student" onClick={() => {}} />}
      {page === 'teachers' && <FAB icon={<Plus size={24} />} label="Add Teacher" onClick={() => {}} />}

      <div className="portal-content">
        <TopBar
          title={nav.find(n => n.id === page)?.label || "Dashboard"}
          subtitle={school.name}
          user={user}
          actions={<Btn variant="ghost" size="sm" onClick={onLogout} icon={<LogOut size={14} />}>Sign out</Btn>}
        />
        <div className="portal-padding">
          {page === "dashboard" && <AdminDashboard setPage={setPage} />}
          {page === "students" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.textLight }} />
                  <input placeholder="Search students..." style={{ padding: "10px 12px 10px 36px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, width: '100%', background: '#fff' }} />
                </div>
                <Btn variant="ghost" size="md" icon={<Filter size={16} />}>Filters</Btn>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                   <Btn variant="primary" size="md" icon={<Plus size={16} />}>Add Student</Btn>
                </div>
              </div>
              <Card pad={0}>
                <Table
                  cols={["Roll No.", "Name", "Class", "Attendance", "Grade", "Parent", "Actions"]}
                  rows={STUDENTS.map(s => [
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: T.textMid, fontWeight: 600 }}>{s.roll}</span>,
                    <div style={{ fontWeight: 600 }}>{s.name}</div>,
                    <Badge color="slate">{s.class}</Badge>,
                    <AttendancePct pct={s.attendance} />,
                    <Badge color={s.grade.startsWith("A") ? "green" : "sky"}>{s.grade}</Badge>,
                    <div style={{ fontSize: 12, color: T.textMid }}>{s.parent}</div>,
                    <Btn variant="ghost" size="sm">Details</Btn>,
                  ])}
                />
              </Card>
            </div>
          )}
          {page === "attendance" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
                  <FormField label="Select Date" type="date" value="2025-05-04" />
                  <FormField label="Select Class" type="select" options={CLASSES.map(c => ({value: c, label: c}))} value="X-A" />
                  <Btn variant="primary" style={{ marginTop: 6 }}>Generate Report</Btn>
               </div>
               <Card pad={0}>
                  <Table 
                    cols={["Roll", "Student", "Status", "Marked By", "Time"]}
                    rows={STUDENTS.filter(s => s.class === "X-A").map(s => [
                      s.roll, s.name, <AttendanceDot status={s.status === "present" ? "P" : s.status === "absent" ? "A" : "L"} />, "Mrs. Lakshmi", "08:45 AM"
                    ])}
                  />
               </Card>
            </div>
          )}
          {page === "teachers" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <Card pad={0}>
                  <Table 
                    cols={["Name", "Subject", "Classes", "Attendance", "Actions"]}
                    rows={TEACHERS.map(t => [
                      <div style={{ fontWeight: 600 }}>{t.name}</div>,
                      t.subject,
                      t.classes.join(", "),
                      <AttendancePct pct={t.attendance} />,
                      <Btn variant="ghost" size="sm">Profile</Btn>
                    ])}
                  />
               </Card>
            </div>
          )}
          {page === "classes" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                  {CLASSES.map(c => (
                    <Card key={c} style={{ cursor: 'pointer' }}>
                       <div style={{ fontSize: 18, fontWeight: 700 }}>{c}</div>
                       <div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>40 Students &bull; 12 Subjects</div>
                       <div style={{ marginTop: 12 }}><Btn variant="ghost" size="sm" full>View Class</Btn></div>
                    </Card>
                  ))}
               </div>
            </div>
          )}
          {page === "leaves" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <Card pad={0}>
                  <Table 
                    cols={["Requestor", "Type", "Dates", "Reason", "Status", "Actions"]}
                    rows={[
                      ["Mrs. Lakshmi Rao", "Teacher", "10-12 May", "Family Event", <Badge color="amber">Pending</Badge>, <div style={{display:'flex', gap:6}}><Btn variant="success" size="sm">Approve</Btn><Btn variant="danger" size="sm">Reject</Btn></div>],
                      ["Arjun Mehta", "Student", "Today", "Medical", <Badge color="green">Approved</Badge>, <Btn variant="ghost" size="sm">View</Btn>],
                    ]}
                  />
               </Card>
            </div>
          )}
          {page === "reports" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <Card>
                     <div style={{ fontWeight: 600, marginBottom: 16 }}>Monthly Attendance Trend</div>
                     <div style={{ height: 200, display: "flex", alignItems: "flex-end", gap: 10, paddingBottom: 20 }}>
                        {[65, 80, 45, 90, 75, 85, 95].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, background: T.sky, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                             <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, textAlign: 'center', fontSize: 10 }}>M{i+1}</div>
                          </div>
                        ))}
                     </div>
                  </Card>
                  <Card>
                     <div style={{ fontWeight: 600, marginBottom: 16 }}>Category Distribution</div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[{l: "General", p: 85}, {l: "OBC", p: 10}, {l: "SC/ST", p: 5}].map(x => (
                          <div key={x.l}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}><span>{x.l}</span><span>{x.p}%</span></div>
                             <div style={{ height: 6, background: T.border, borderRadius: 3 }}><div style={{ width: `${x.p}%`, height: '100%', background: T.sky, borderRadius: 3 }} /></div>
                          </div>
                        ))}
                     </div>
                  </Card>
               </div>
            </div>
          )}
          {page === "branding" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <Card>
                  <div style={{ fontWeight: 600, marginBottom: 20 }}>Visual Customization</div>
                  <div style={{ maxWidth: 500 }}>
                     <FormField label="School Logo" type="file" />
                     <FormField label="Primary Color" type="color" value="#0F1C2E" />
                     <FormField label="Welcome Message" type="textarea" value="Welcome to St. Mary's Attendance Portal" />
                     <Btn variant="primary">Update Branding</Btn>
                  </div>
               </Card>
            </div>
          )}
          {page === "settings" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <Card>
                  <div style={{ fontWeight: 600, marginBottom: 20 }}>Portal Settings</div>
                  <div style={{ maxWidth: 500 }}>
                     <FormField label="SMS Alerts" type="select" options={[{value: "on", label: "Enabled"}, {value: "off", label: "Disabled"}]} value="on" />
                     <FormField label="Auto-Absent Trigger" type="time" value="09:30" />
                     <FormField label="Holiday Sync" type="select" options={[{value: "y", label: "Yes"}, {value: "n", label: "No"}]} value="y" />
                     <Btn variant="primary">Save Configuration</Btn>
                  </div>
               </Card>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SchoolAdminPortal;
