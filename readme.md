
## Authentication endpoints (public)

| Method    | Endpoint         | Required                                    | Optional     
| -----     | ---------------- | ------------------------------------------  | ------------- |
| POST      | /auth/register   | name, password, email, type (role), suspend | phone, address| | GET       | /auth/login      | email, password                             | N/A           |

Data details
| field     |  data type       | addition al requirements
| --------- | ---------------- | --------------------------------------------------- |
| name      | string           | required, 128 max                                   |
| password  | string           | required, 128 max, unique                           |
| email     | string           | required, 128 max                                   |
| type      | integer          | required,                                           |
| phone     | string           | optional, 128 max, unique                           |
| address   | string           | optional, 128 max                                   |
| suspend   | boolean          | required,                                           |

## Users endpoints (Auth)

| Method    | Endpoint          | Notes                                      |  Auth         |
| -----     | ----------------  | ------------------------------------------ | ------------- |
| GET       | /api/user         | Get all users                              | registered    | | GET       | /api/user/:id     | Get user by id                             | registered    | 
| GET       | /api/user/type/:id| Get users by type                          | registered    |
|           |                   | 1=mod, 2=charity, 3=basic                  |               |
| PUT       | /api/user/:id     | Edit user info (!suspend, !type)           | self          |
| DELETE    | /api/user/:id     | Delete user                                | self, mod     |

