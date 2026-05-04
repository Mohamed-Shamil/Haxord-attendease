import React from 'react';
import { Badge, AttendanceDot, AttendancePct, Btn } from './components/Shared';
import { T } from './theme';

export const SCHOOLS = [
  { id: 1, name: "St. Mary's Public School", initials: "SM", plan: "Growth", students: 1240, teachers: 68, status: "active", domain: "attend.stmarys.edu", city: "Bangalore", joined: "Jan 2024" },
  { id: 2, name: "Springfield High School", initials: "SH", plan: "Enterprise", students: 3100, teachers: 142, status: "active", domain: "sph.attendease.com", city: "Mumbai", joined: "Mar 2023" },
  { id: 3, name: "Greenvalley International", initials: "GV", plan: "Starter", students: 180, teachers: 14, status: "trial", domain: "gv.attendease.com", city: "Chennai", joined: "Dec 2024" },
  { id: 4, name: "Delhi Public School RK Puram", initials: "DP", plan: "Growth", students: 2800, teachers: 130, status: "active", domain: "attend.dpsrkp.com", city: "Delhi", joined: "Jun 2023" },
];

export const STUDENTS = [
  { id: 1, name: "Arjun Mehta", roll: "X-A-01", class: "X-A", attendance: 87, grade: "A", status: "present", parent: "Rajan Mehta", phone: "9876543210" },
  { id: 2, name: "Priya Sharma", roll: "X-A-02", class: "X-A", attendance: 72, grade: "B+", status: "absent", parent: "Sunita Sharma", phone: "9876543211" },
  { id: 3, name: "Rohit Kumar", roll: "X-A-03", class: "X-A", attendance: 91, grade: "A+", status: "present", parent: "Vijay Kumar", phone: "9876543212" },
  { id: 4, name: "Sneha Patel", roll: "X-A-04", class: "X-A", attendance: 63, grade: "B", status: "late", parent: "Anita Patel", phone: "9876543213" },
  { id: 5, name: "Karan Singh", roll: "X-A-05", class: "X-A", attendance: 78, grade: "B+", status: "present", parent: "Harpreet Singh", phone: "9876543214" },
  { id: 6, name: "Divya Nair", roll: "X-B-01", class: "X-B", attendance: 95, grade: "A+", status: "present", parent: "Gopinath Nair", phone: "9876543215" },
  { id: 7, name: "Amit Joshi", roll: "X-B-02", class: "X-B", attendance: 55, grade: "C+", status: "absent", parent: "Meena Joshi", phone: "9876543216" },
];

export const TEACHERS = [
  { id: 1, name: "Mrs. Lakshmi Rao", subject: "Mathematics", classes: ["X-A", "X-B", "IX-A"], attendance: 96, joined: "Aug 2018" },
  { id: 2, name: "Mr. Thomas George", subject: "Physics", classes: ["X-A", "XI-A", "XII-B"], attendance: 91, joined: "Jun 2015" },
  { id: 3, name: "Ms. Fatima Khan", subject: "English", classes: ["X-A", "X-B", "IX-B"], attendance: 98, joined: "Jan 2020" },
  { id: 4, name: "Mr. Suresh Babu", subject: "Chemistry", classes: ["XI-A", "XII-A", "XII-B"], attendance: 89, joined: "Mar 2017" },
];

export const CLASSES = ["IX-A", "IX-B", "X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

export const NOTIFICATIONS = [
  { id: 1, type: "absent", title: "Absence Alert", body: "Priya Sharma (X-A) marked absent today. Notification sent to parent.", time: "09:12 AM", read: false },
  { id: 2, type: "low", title: "Low Attendance Warning", body: "Amit Joshi (X-B) attendance has fallen to 55%. Academic review triggered.", time: "09:30 AM", read: false },
  { id: 3, type: "leave", title: "Leave Request", body: "Leave application submitted for Arjun Mehta (X-A) for 28–30 Apr.", time: "Yesterday", read: true },
  { id: 4, type: "system", title: "Year-end Promotion Ready", body: "Promotion rules validated. 1,194 students eligible. Review before finalizing.", time: "2 days ago", read: true },
];
