# Đồ án xây dụng web serverless trên dịch vụ đám mây AWS

Thực hiện tạo một webside serverless quản lý sinh viên đơn giản sử dụng dịch vụ
DynamoDB và Lambda của AWS

## Hướng dẫn cài đặt

### 1. Cài đặt một máy ảo EC2

- Tạo máy ảo EC2 Cloud9Ubuntu cấu hình thì tùy theo nhu cầu sử dụng.
- Tạo lần lượt các giao thức SSH, HTTP, HTTPS và một giao thức có Port là 8080
  để truy cập web cho máy ảo.

### 2. Tạo 1 địa chỉ ElasticIP và gán nó vào máy ảo EC2 vừa tạo

### 3. Thực hiện cấu hình máy ảo

- Chạy lệnh "sudo apt-get update" để cập nhật phiên bản mới nhất, "sudo apt-get
  install npm" để cài đặt Nodejs.
- Chạy lệnh aws configure và cung cấp lần lượt các thông tin AWS Access Key ID,
  AWS Secret Access Key, Default region name, Default output format.
- Chạy lệnh aws configure set aws_session_token
  "FwoGZXIvYXdzEHsaDDRD+wtURzqKuoR4BiLPAXug3np0i0P9xGn/jsLBvf68XBxUFMgp0r2b1s9Ls+RbF9qbTMt6FRyWCNKyddZlhua0cehGQIrE2gdBWAwBQrxBR9KJjYbD+FamFWXqR37DtXU8T/gwm4dyA5AYuzXtktyf4j22hX79nxnsNSXy14/bjI73Dh2bAHAZX6nDbE+PESaEuLYUfPPKOqN+lJvCIOpjPZaYHg9Eyt9OWDR6Q92R4bfklTUDisJocOFHytodEy5v85UbdZOqT7aZwy86kJlkATpnprlM4WIL355lrSjE+7qTBjIt31zheNKprpUdcxynVBhdNgGZE6hTUUPv2ZfRJoZYZixUenB2yhYLNXyq7itq"

  để cung cấp token.

  -Check aws configure: aws sts get-caller-identity

- Tạo SQS
- Tạo các table trong DynamoDB ở các file \*.js ở trong /environment/Model

### 4. Chạy trương trình

- Đi đến thư mục environment bằng lệnh "cd AWS/environment"
- Chạy lệnh "node index" để chạy trang web
