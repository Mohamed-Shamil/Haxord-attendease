import React, { useState } from 'react';
import { T } from '../theme';
import { Sidebar, BottomNav, TopBar, StatCard, Card, Btn, Table, Badge, AttendancePct, AttendanceDot, FormField, FAB } from '../components/Shared';
import { STUDENTS } from '../data';
import { LayoutDashboard, Calendar, Users, Hand, BarChart3, Clock, LogOut, CheckCircle2, Plus } from 'lucide-react';

const TeacherDashboard = ({ setPage }) => (
  <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
      <StatCard label="My Classes" value="3" color="sky" icon={LayoutDashboard} />
      <StatCard label="Total Students" value="122" color="green" icon={Users} />
      <StatCard label="Pending Leaves" value="2" color="amber" icon={Hand} />
      <StatCard label="Avg Attendance" value="94%" color="green" icon={CheckCircle2} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Today's Schedule</div>
        {[
          { period: "P1", time: "08:00–08:45", class: "X-A", subject: "Mathematics", room: "101" },
          { period: "P2", time: "08:45–09:30", class: "X-B", subject: "Mathematics", room: "102" },
          { period: "P4", time: "10:30–11:15", class: "IX-A", subject: "Mathematics", room: "201" },
        ].map(p => (
          <div key={p.period} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}`, alignItems: "center" }}>
            <div style={{ width: 45, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: T.text, fontWeight: 700 }}>{p.period}</div>
              <div style={{ fontSize: 10, color: T.textLight }}>{p.time.split("–")[0]}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.class} &bull; {p.subject}</div>
              <div style={{ fontSize: 12, color: T.textMid, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> Room {p.room} &bull; {p.time}
              </div>
            </div>
            <Btn variant="primary" size="sm">Mark</Btn>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Low Attendance Students</div>
        {STUDENTS.filter(s => s.attendance < 75).map(s => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>{s.class}</div>
            </div>
            <AttendancePct pct={s.attendance} />
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const TeacherPortal = ({ onLogout }) => {
  const [page, setPage] = useState("dashboard");
  const user = { name: "Mrs. Lakshmi Rao", initials: "LR", role: "Mathematics Teacher" };
  const nav = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "attendance", icon: <Calendar size={18} />, label: "Mark Attendance" },
    { id: "students", icon: <Users size={18} />, label: "My Students" },
    { id: "leaves", icon: <Hand size={18} />, label: "Leave Requests", badge: 2 },
    { id: "reports", icon: <BarChart3 size={18} />, label: "Reports" },
  ];
  const school = { name: "St. Mary's", initials: "SM", plan: "Standard" };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={nav} active={page} onSelect={setPage} school={school} role="Teacher" />
      <BottomNav items={nav} active={page} onSelect={setPage} />
      
      {page === 'attendance' && <FAB icon={<CheckCircle2 size={24} />} label="Submit All" onClick={() => {}} />}
      {page === 'dashboard' && <FAB icon={<Calendar size={24} />} label="Mark Today" onClick={() => setPage('attendance')} />}

      <div className="portal-content">
        <TopBar title={nav.find(n => n.id === page)?.label || ""} subtitle={school.name} user={user} actions={<Btn variant="ghost" size="sm" onClick={onLogout} icon={<LogOut size={14} />}>Sign out</Btn>} />
        <div className="portal-padding">
          {page === "dashboard" && <TeacherDashboard setPage={setPage} />}
          {page === "attendance" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
                <FormField label="Class" type="select" options={[{value: "X-A", label: "X-A"}, {value: "X-B", label: "X-B"}]} value="X-A" />
                <FormField label="Subject" type="select" options={[{value: "Math", label: "Mathematics"}]} value="Math" />
                <Btn variant="primary" style={{ marginTop: 6 }}>Start Marking</Btn>
              </div>
              <Card pad={0}>
                <Table 
                  cols={["Roll", "Name", "Attendance", "Today's Status"]}
                  rows={STUDENTS.filter(s => s.class === "X-A").map(s => [
                    s.roll, 
                    <div style={{fontWeight:600}}>{s.name}</div>, 
                    <AttendancePct pct={s.attendance} />,
                    <div style={{display:'flex', gap:8}}>
                      <Btn variant="success" size="sm">Present</Btn>
                      <Btn variant="ghost" size="sm">Absent</Btn>
                    </div>
                  ])}
                />
              </Card>
            </div>
          )}
          {page === "students" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <Card pad={0}>
                <Table 
                  cols={["Roll", "Name", "Class", "Parent Contact", "Attendance", "Actions"]}
                  rows={STUDENTS.map(s => [
                    s.roll, s.name, s.class, s.phone, <AttendancePct pct={s.attendance} />, <Btn variant="ghost" size="sm">Contact</Btn>
                  ])}
                />
              </Card>
            </div>
          )}
          {page === "leaves" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <Card pad={0}>
                <Table 
                  cols={["Student", "Class", "Dates", "Reason", "Status", "Actions"]}
                  rows={[
                    ["Priya Sharma", "X-A", "Today", "Medical", <Badge color="amber">Pending</Badge>, <div style={{display:'flex', gap:6}}><Btn variant="success" size="sm">Approve</Btn><Btn variant="danger" size="sm">Reject</Btn></div>],
                  ]}
                />
              </Card>
            </div>
          )}
          {page === "reports" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <Card>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>Class Attendance Rate</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: T.green }}>94.2%</div>
                    <div style={{ fontSize: 12, color: T.textMid }}>Above school average by 2.1%</div>
                  </Card>
                  <Card>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>Syllabus Progress</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: T.sky }}>75%</div>
                    <div style={{ fontSize: 12, color: T.textMid }}>On track for Term 2</div>
                  </Card>
               </div>
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

export default TeacherPortal;
