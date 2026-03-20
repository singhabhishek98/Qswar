# 🚀 Leave Management System - Backend API Documentation

## 📦 Technology Stack
- **Java 17+**
- **Spring Boot 3.2.0**
- **MySQL 8.0**
- **Spring Data JPA**
- **Spring Security** (for password encryption)
- **Maven**

---

## 🗄️ Database Schema

### Table 1: `leave_users`
```sql
CREATE TABLE leave_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 2: `leaves`
```sql
CREATE TABLE leaves (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    leave_type VARCHAR(50) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    feedback TEXT,
    user_id BIGINT NOT NULL,
    manager_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES leave_users(id),
    FOREIGN KEY (manager_id) REFERENCES leave_users(id)
);
```

---

## 🔗 API Endpoints

### 🔐 Authentication APIs

#### 1. Signup
```
POST /api/leave-auth/signup
Content-Type: application/json

Request Body:
{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "password": "password123",
  "role": "USER"  // USER, MANAGER, ADMIN
}

Response (200):
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "Rahul Kumar",
    "email": "rahul@example.com",
    "role": "USER"
  }
}

Response (400):
{
  "message": "Email already exists"
}
```

#### 2. Login
```
POST /api/leave-auth/login
Content-Type: application/json

Request Body:
{
  "email": "rahul@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "Rahul Kumar",
    "email": "rahul@example.com",
    "role": "USER"
  }
}

Response (400):
{
  "message": "Invalid credentials"
}
```

---

### 📝 Leave Management APIs

#### 3. Create Leave Request
```
POST /api/leaves/create
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "leaveType": "SICK",  // SICK, CASUAL, EARNED
  "fromDate": "2024-01-25",
  "toDate": "2024-01-27",
  "reason": "Medical checkup",
  "userId": 1,
  "managerId": 2  // Optional
}

Response (200):
{
  "id": 1,
  "leaveType": "SICK",
  "fromDate": "2024-01-25",
  "toDate": "2024-01-27",
  "reason": "Medical checkup",
  "status": "PENDING",
  "userId": 1,
  "managerId": 2,
  "createdAt": "2024-01-20T10:30:00"
}
```

#### 4. Get User Leaves
```
GET /api/leaves/user?userId={userId}
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "leaveType": "SICK",
    "fromDate": "2024-01-25",
    "toDate": "2024-01-27",
    "reason": "Medical checkup",
    "status": "PENDING",
    "feedback": null,
    "userId": 1,
    "managerId": 2,
    "createdAt": "2024-01-20T10:30:00"
  },
  {
    "id": 2,
    "leaveType": "CASUAL",
    "fromDate": "2024-02-01",
    "toDate": "2024-02-02",
    "reason": "Personal work",
    "status": "APPROVED",
    "feedback": "Approved",
    "userId": 1,
    "managerId": 2,
    "createdAt": "2024-01-22T14:20:00"
  }
]
```

#### 5. Get Pending Leaves (Manager)
```
GET /api/leaves/manager/pending?managerId={managerId}
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "userName": "Rahul Kumar",
    "leaveType": "SICK",
    "fromDate": "2024-01-25",
    "toDate": "2024-01-27",
    "reason": "Medical checkup",
    "status": "PENDING",
    "userId": 1,
    "managerId": 2
  }
]
```

#### 6. Get All Leaves (Admin)
```
GET /api/leaves/all
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "userName": "Rahul Kumar",
    "leaveType": "SICK",
    "fromDate": "2024-01-25",
    "toDate": "2024-01-27",
    "reason": "Medical checkup",
    "status": "PENDING",
    "managerName": "Suresh Patel",
    "userId": 1,
    "managerId": 2
  },
  {
    "id": 2,
    "userName": "Priya Sharma",
    "leaveType": "CASUAL",
    "fromDate": "2024-02-01",
    "toDate": "2024-02-02",
    "reason": "Family function",
    "status": "APPROVED",
    "managerName": "Suresh Patel",
    "userId": 3,
    "managerId": 2
  }
]
```

#### 7. Approve Leave
```
PUT /api/leaves/{id}/approve
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "feedback": "Approved for medical reasons"
}

Response (200):
{
  "id": 1,
  "leaveType": "SICK",
  "status": "APPROVED",
  "feedback": "Approved for medical reasons",
  "updatedAt": "2024-01-21T09:15:00"
}
```

#### 8. Reject Leave
```
PUT /api/leaves/{id}/reject
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "feedback": "Peak season, please reschedule"
}

Response (200):
{
  "id": 1,
  "leaveType": "SICK",
  "status": "REJECTED",
  "feedback": "Peak season, please reschedule",
  "updatedAt": "2024-01-21T09:15:00"
}
```

#### 9. Update Leave (User)
```
PUT /api/leaves/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "leaveType": "CASUAL",
  "fromDate": "2024-02-05",
  "toDate": "2024-02-07",
  "reason": "Updated reason"
}

Response (200):
{
  "id": 1,
  "leaveType": "CASUAL",
  "fromDate": "2024-02-05",
  "toDate": "2024-02-07",
  "reason": "Updated reason",
  "status": "PENDING",
  "updatedAt": "2024-01-21T10:00:00"
}
```

#### 10. Get Statistics (Admin)
```
GET /api/leaves/stats
Authorization: Bearer {token}

Response (200):
{
  "total": 12,
  "pending": 3,
  "approved": 7,
  "rejected": 2
}
```

---

## 📁 Java Package Structure

```
com.qswar.leave/
├── controller/
│   ├── AuthController.java
│   └── LeaveController.java
├── service/
│   ├── AuthService.java
│   └── LeaveService.java
├── repository/
│   ├── LeaveUserRepository.java
│   └── LeaveRepository.java
├── model/
│   ├── LeaveUser.java
│   └── Leave.java
├── dto/
│   ├── LoginRequest.java
│   ├── SignupRequest.java
│   └── LeaveRequest.java
└── config/
    └── CorsConfig.java
```

---

## 🔧 Key Implementation Points

### 1. CORS Configuration
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
            }
        };
    }
}
```

### 2. Password Encryption
```java
BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
String hashedPassword = passwordEncoder.encode(plainPassword);
```

### 3. Repository Queries
```java
// LeaveRepository.java
List<Leave> findByUserId(Long userId);
List<Leave> findByManagerIdAndStatus(Long managerId, String status);
long countByStatus(String status);

// LeaveUserRepository.java
Optional<LeaveUser> findByEmail(String email);
boolean existsByEmail(String email);
```

---

## 🎯 Business Logic

### Leave Creation Flow:
1. User submits leave request
2. Status set to "PENDING"
3. Assigned to manager (managerId)
4. Save to database

### Approval Flow:
1. Manager gets pending leaves
2. Reviews and adds feedback
3. Updates status to "APPROVED"
4. Sets updatedAt timestamp

### Rejection Flow:
1. Manager must provide feedback
2. Updates status to "REJECTED"
3. User can update and resubmit

### Update Flow:
1. Only REJECTED leaves can be updated
2. Status reset to "PENDING"
3. Resubmitted to manager

---

## 🔐 Security Notes

- Use BCrypt for password hashing
- Implement JWT for authentication (optional for now)
- Validate user roles before operations
- Sanitize all inputs

---

## 🚀 Deployment

### application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/leave_management
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

### Railway Deployment
1. Push to GitHub
2. Connect Railway
3. Add MySQL service
4. Set environment variables
5. Deploy!

---

## ✅ Testing Checklist

- [ ] Signup with all roles
- [ ] Login with valid credentials
- [ ] Create leave request
- [ ] Get user leaves
- [ ] Manager approve/reject
- [ ] Admin view all leaves
- [ ] Get statistics
- [ ] Update rejected leave
- [ ] CORS working from frontend

---

**Base URL**: `https://your-api.railway.app`
**Frontend expects**: Same structure as dummy data
**Status Values**: PENDING, APPROVED, REJECTED
**Roles**: USER, MANAGER, ADMIN
