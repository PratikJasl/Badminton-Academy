# Badminton Academy Web Application

## Functional Requirements
1) **Role-Based Access Control (RBAC):** Define roles with specific permissions: students, coaches, and admins.
2) **User Management:** Store and manage detailed user profiles (name, contact, role, etc.).
3) **Attendance Tracking:** Track student attendance for each session.
4) **Payment Tracking:** Monitor student payments, with automated updates on payment due dates and status.
5) **Coach Management:** Allow admins to add and manage coach details (name, experience, availability).
6) **Location Management:** Enable coaches to add and manage training locations.
7) **Coaching Plans:** Allow coaches to create and modify coaching plans.
8) **Coaching Schedule Management:** Enable coaches to add, update, and manage training schedules.
9) **Attendance Marking by Coaches:** Allow coaches to mark student attendance for each session.
10) **Payment Tracking by Coaches:** Allow coaches to track and update payment statuses for students.

## Non-Functional Requirements
1) **Data persistence:** Persist the user payment and attendance data.
2) **Security:** Ensure user data is protected.
3) **Reliability:** Ensure high availability and failover mechanisms to keep the system running smoothly even during maintenance or unexpected issues.

## System Constraints
1) **MVP (Minimum Viable Product):** Focus on creating the most important features first.
2) **Limited resources:** Only 2 developers available.


## Sequence Diagram
•	The sequence diagram entails the below mentioned details:

1)	It describes all the different entities involved in the system.

2)	It describes all the API endpoints our system will contain.

3)	It describes the different HTTP methods to be used along with the endpoints.

4)	It describes all the use cases for which our system will be used for.

5)	It describes all the different data formats being shared between the different entities.

6)	It describes the data flow between the different entities of the system.

![Sequence Diagram](./client/src/assets/Badminton%20Academy%20Sequence%20Diagram.png)