# My_friend_Kim-Jeong-San_BE

.env 파일은 만들어서 사용할 

### Start 
``` java
npm run dev
npm run prod
```

# 🛠 Tech Stack

- MVC 패턴 사용
- Node.js 환경에서 Express 프레임워크를 사용해 개발
- Sequelize ORM 사용
- Mysql DB 사용
- ### MVC
![image](https://user-images.githubusercontent.com/78139690/179363872-7ba08ee1-5bbd-4c51-bc1b-48140caa5d4b.png)


# ⚡️ Branch
- main: Prod로 출시될 수 있는 브랜치
- develop: 다음 출시 버전을 개발하는 브랜치
- feature: 기능을 개발하는 브랜치



# ⚙️ 디렉토리 구조
 ```
├── README.md
├── app.js
├── config
│   └── config.json //database info
├── controllers
│   └── (기능)Controller.js
├── dto
│   └── ResponseDto.js
│   └── (이름)Dto.js
├── models
│   └── index.js
│   └── (model이름).js
├── node_modules
│   ├── @ampproject
│   ├── @babel
│   └── @jridgewell
├── package-lock.json
├── package.json
├── routes
│   └── middlewares.js
│   └── (Route이름)Route.js
├── services
│   └── (기능)Service.js
└── validation
  
 ```
