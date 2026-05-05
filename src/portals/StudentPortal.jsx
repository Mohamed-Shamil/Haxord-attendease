import React, { useState } from 'react';
import { T } from '../theme';
import { Sidebar, BottomNav, TopBar, StatCard, Card, Btn, Table, Badge, AttendancePct, AttendanceDot, Modal, FAB } from '../components/Shared';
import { STUDENTS, NOTIFICATIONS } from '../data';
import { LayoutDashboard, Calendar, BarChart3, Hand, Bell, Clock, LogOut, Award, User, Plus } from 'lucide-react';

const StudentDashboard = ({ student }) => (
  <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 24 }}>
      <StatCard label="My Attendance" value={student.attendance + "%"} delta={2} color={student.attendance >= 80 ? "green" : "red"} icon={Calendar} />
      <StatCard label="Overall Grade" value={student.grade} color="sky" icon={Award} />
      <StatCard label="Days Present" value="87" color="green" icon={CheckCircle} />
      <StatCard label="Days Absent" value="13" color="red" icon={Bell} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginBottom: 18 }}>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Attendance Calendar (April)</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {"PPAPPPPPAPLPPPPPPAPP".split("").map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: T.textLight, marginBottom: 4, width: 28 }}>{i + 1}</div>
              <AttendanceDot status={s} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
          {[["Present", T.green], ["Absent", T.red], ["Late", T.amber]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", gap: 6, alignItems: "center", color: T.textMid, fontWeight: 500 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />{l}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Today's Classes</div>
        {[
          { time: "08:00", subject: "Mathematics", teacher: "Mrs. Lakshmi Rao", room: "101" },
          { time: "08:45", subject: "Physics", teacher: "Mr. Thomas George", room: "Lab 1" },
          { time: "10:30", subject: "English", teacher: "Ms. Fatima Khan", room: "201" },
        ].map(p => (
          <div key={p.time} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 12, color: T.text, fontWeight: 700, width: 45, fontFamily: 'monospace' }}>{p.time}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.subject}</div>
              <div style={{ fontSize: 12, color: T.textMid }}>{p.teacher} &bull; Room {p.room}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

const StudentPortal = ({ onLogout, mode = "student" }) => {
  const [page, setPage] = useState("dashboard");
  const student = STUDENTS[0];
  const user = mode === "student"
    ? { name: "Arjun Mehta", initials: "AM", role: "Student &bull; X-A" }
    : { name: "Rajan Mehta", initials: "RM", role: "Parent of Arjun" };

  const nav = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "attendance", icon: <Calendar size={18} />, label: "My Attendance" },
    { id: "performance", icon: <BarChart3 size={18} />, label: "Performance" },
    { id: "leaves", icon: <Hand size={18} />, label: "Leave Requests" },
    { id: "notifications", icon: <Bell size={18} />, label: "Notifications", badge: 2 },
  ];

  const school = { name: "St. Mary's", initials: "SM", plan: "Basic" };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={nav} active={page} onSelect={setPage} school={school} role={mode === "student" ? "Student" : "Parent"} />
      <BottomNav items={nav} active={page} onSelect={setPage} />

      {page === 'leaves' && <FAB icon={<Plus size={24} />} label="Apply Leave" onClick={() => {}} />}

      <div className="portal-content">
        <TopBar title={nav.find(n => n.id === page)?.label || ""} subtitle={school.name} user={user} actions={<Btn variant="ghost" size="sm" onClick={onLogout} icon={<LogOut size={14} />}>Sign out</Btn>} />
        <div className="portal-padding">
          {page === "dashboard" && <StudentDashboard student={student} />}
          {page === "attendance" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                 <StatCard label="Monthly Avg" value="88%" color="green" />
                 <StatCard label="Total Classes" value="120" color="sky" />
                 <StatCard label="Present" value="106" color="green" />
                 <StatCard label="Absent" value="14" color="red" />
              </div>
              <Card pad={0}>
                <Table 
                  cols={["Date", "Status", "Subject", "Marked Time"]}
                  rows={[
                    ["04 May 2025", <AttendanceDot status="P" />, "All Subjects", "08:45 AM"],
                    ["03 May 2025", <AttendanceDot status="A" />, "Sick Leave", "---"],
                    ["02 May 2025", <AttendanceDot status="P" />, "All Subjects", "08:42 AM"],
                    ["01 May 2025", <AttendanceDot status="L" />, "All Subjects", "09:05 AM"],
                  ]}
                />
              </Card>
            </div>
          )}
          {page === "performance" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  <Card>
                    <div style={{ fontWeight: 600, marginBottom: 16 }}>Grade Analytics</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {[{s: "Math", g: "A"}, {s: "Physics", g: "A-"}, {s: "English", g: "B+"}].map(x => (
                         <div key={x.s} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
                            <span style={{ fontSize: 13, color: T.textMid }}>{x.s}</span>
                            <Badge color="sky">{x.g}</Badge>
                         </div>
                       ))}
                    </div>
                  </Card>
                  <Card>
                     <div style={{ fontWeight: 600, marginBottom: 16 }}>Class Rank</div>
                     <div style={{ fontSize: 42, fontWeight: 800, color: T.sky }}>#08</div>
                     <div style={{ fontSize: 13, color: T.textMid }}>Top 15% of the class</div>
                  </Card>
               </div>
            </div>
          )}
          {page === "leaves" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ fontSize: 14, color: T.textMid }}>History of leave requests</div>
                  <Btn variant="primary" size="sm">Apply for Leave</Btn>
               </div>
               <Card pad={0}>
                 <Table 
                   cols={["Type", "Period", "Reason", "Status"]}
                   rows={[
                     ["Medical", "03 May 2025", "Fever", <Badge color="green">Approved</Badge>],
                     ["Casual", "28-30 Apr 2025", "Family Wedding", <Badge color="green">Approved</Badge>],
                   ]}
                 />
               </Card>
            </div>
          )}
          {page === "notifications" && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <Card pad={0}>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: 20, borderBottom: `1px solid ${T.border}`, background: n.read ? 'transparent' : `${T.sky}05` }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{n.title}</span>
                          <span style={{ fontSize: 11, color: T.textLight }}>{n.time}</span>
                       </div>
                       <p style={{ fontSize: 13, color: T.textMid }}>{n.body}</p>
                    </div>
                  ))}
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

export default StudentPortal;
