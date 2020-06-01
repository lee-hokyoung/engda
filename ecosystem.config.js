module.exports = {
  apps: [
    {
      name: "engda",
      // pm2로 실행될 파일 경로
      script: "./bin/www",
      // 배포환경시 적용될 설정 지정
      env_production: {
        PORT: 4500,
        NODE_ENV: "production"
      }
    }
  ]
};
