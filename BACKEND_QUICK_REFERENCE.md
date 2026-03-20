# 🎯 Backend API - Quick Reference

## 📋 10 APIs Banana Hai

### 🔐 Auth (2 APIs)
1. **POST** `/api/leave-auth/signup` - Register user
2. **POST** `/api/leave-auth/login` - Login user

### 📝 Leave Management (8 APIs)
3. **POST** `/api/leaves/create` - Create leave
4. **GET** `/api/leaves/user?userId={id}` - User ki leaves
5. **GET** `/api/leaves/manager/pending?managerId={id}` - Manager ke pending
6. **GET** `/api/leaves/all` - Admin ke liye sab
7. **PUT** `/api/leaves/{id}/approve` - Approve leave
8. **PUT** `/api/leaves/{id}/reject` - Reject leave
9. **PUT** `/api/leaves/{id}` - Update leave
10. **GET** `/api/leaves/stats` - Statistics

---

## 🗄️ Database (2 Tables)

### Table 1: leave_users
```
id, name, email, password, role, created_at
```

### Table 2: leaves
```
id, leave_type, from_date, to_date, reason, status, 
feedback, user_id, manager_id, created_at, updated_at
```

---

## 📦 Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    
    <!-- Spring Security (password only) -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-crypto</artifactId>
    </dependency>
</dependencies>
```

---

## 🔑 Key Points

### Status Values:
- `PENDING` - Default
- `APPROVED` - Manager approved
- `REJECTED` - Manager rejected

### Roles:
- `USER` - Employee
- `MANAGER` - Approver
- `ADMIN` - System owner

### Leave Types:
- `SICK` - Sick leave
- `CASUAL` - Casual leave
- `EARNED` - Earned leave

---

## 🎯 Response Format Examples

### User Leaves Response:
```json
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
  }
]
```

### Manager Pending Response:
```json
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

### Admin All Leaves Response:
```json
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
  }
]
```

### Stats Response:
```json
{
  "total": 12,
  "pending": 3,
  "approved": 7,
  "rejected": 2
}
```

---

## ⚡ Quick Setup

1. Create Spring Boot project
2. Add dependencies
3. Create 2 tables in MySQL
4. Create 2 entities (LeaveUser, Leave)
5. Create 2 repositories
6. Create 2 services
7. Create 2 controllers
8. Add CORS config
9. Test APIs
10. Deploy to Railway

---

## 🔧 CORS Config (Important!)

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
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

---

## 📝 Notes

- Password ko BCrypt se hash karo
- Frontend `leaveToken` aur `leaveUser` localStorage me store karega
- Response format exactly same hona chahiye jo frontend expect kar raha hai
- Date format: `YYYY-MM-DD`
- Timestamp format: ISO 8601

---

**Total Files**: ~10-12 Java files
**Time**: 2-3 hours
**Difficulty**: Easy-Medium

Detailed documentation: `BACKEND_API_DOCUMENTATION.md`
