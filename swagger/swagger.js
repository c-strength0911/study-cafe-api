const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "CloudPrograming",
      description:
        "클라우드 프로그래밍 API 서버 개발",
    },
    servers: [
      {
        url: "http://localhost:8080", // Swagger-docs 에서 요청할 URL 주소.
      },
    ],

    // components: {
    //   securitySchemes: {
    //     jwt: {
    //       type: 'apiKey',
    //       name: 'Authorization',
    //       in: 'header'
    //     }
    //   }
    // },
    // security: [
    //   { jwt: [] }
    // ],

  },
  apis: ["./app/routers/*.js"], //Swagger 연동 파일 경로 설정
  
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }