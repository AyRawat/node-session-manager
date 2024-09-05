# node-session-manager
Manages concurrent sessions of a user

### Dependencies
- Node.js
- Typescript
- Postgres
- TypeOrm
- express

### Runnig the project
```
git clone https://github.com/AyRawat/node-session-manager.git;
cd node-session-manager
npm run install
npm run dev
```

### Create User

This endpoint allows you to create a new user in the system.

- **URL**: `/createUser`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  - `username`: The name of the user (string)
  - `mobile_number`: The mobile number of the user (string)

#### Example Request

```bash
curl --location 'http://localhost:4000/createUser' \
--header 'Content-Type: application/json' \
--data '{
    "username": "testuser",
    "mobile_number": "7776668881"
}'
```
#### Example Response
```
{
    "mobile_number": "7776668881",
    "username": "testuser",
    "activeSession": "d93581000e2d589e44a7a899bd2cf0cb",
    "sessions": [
        "d93581000e2d589e44a7a899bd2cf0cb"
    ]
}
```


## Get User Details by ID

### Endpoint
`GET /users/{id}`

### Description
Fetches the details of a user based on their ID, including mobile number, username, active session, and all active sessions.

### Request

```bash
curl --location 'http://localhost:4000/users/9423445321' \
--header 'Content-Type: application/json'
```

Response
```
{
    "mobile_number": "9423445321",
    "user_name": "testuser",
    "activeSession": "d93581000e2d589e44a7a899bd2cf0cb",
    "sessions": [
        {
            "session": "4c83527c04bfd98a6ad91f6c6276539c"
        },
        {
            "session": "d93581000e2d589e44a7a899bd2cf0cb"
        }
    ]
}

```
