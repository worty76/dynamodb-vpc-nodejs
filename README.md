# Đồ án xây dụng web serverless trên dịch vụ đám mây AWS

Thực hiện tạo một webside serverless quản lý sinh viên đơn giản sử dụng dịch vụ
DynamoDB và Lambda của AWS

## Hướng dẫn cài đặt

### 1. Cài đặt một máy ảo EC2

- Tạo máy ảo EC2 Cloud9Ubuntu cấu hình thì tùy theo nhu cầu sử dụng.
- Tạo lần lượt các giao thức SSH, HTTP, HTTPS và một giao thức có Port là 8080
  để truy cập web cho máy ảo.
- Tạo thêm các Simple queue service, 25 sqs
- Tạo các 8 tables in Dynamodb

### 2. Tạo 1 địa chỉ ElasticIP và gán nó vào máy ảo EC2 vừa tạo

### 3. Thực hiện cấu hình máy ảo

- Chạy lệnh "sudo apt-get update" để cập nhật phiên bản mới nhất, "sudo apt-get
  install npm" để cài đặt Nodejs.
- Chạy lệnh aws configure và cung cấp lần lượt các thông tin AWS Access Key ID,
  AWS Secret Access Key, Default region name, Default output format.
- Chạy lệnh aws configure set aws_session_token "FwoGZXIvYXdzEPD//////////wEaDM9JdORI44d8kPu8byLPAcIkEFN8BC5ioShxQfMxzqmURPt3a845zvT0q03i+acgyvQYT+Yfi/nkUxaUilk70NaZQWprilgbKTAW49of2j/xvMuXSypUEc9No9WwZ839NvTlaoT6Ertfbpkr9JXtS0Vpo6PsaFkrgXwRtIOgF8TeFuKB6l6F23rSXCDp+GfR3tc8kviic370QCg2cDEE7UrGOonLn3VTuEQ4B8/ZBcpf7mX74eusYytoOh+Qi5hq2zKsLm/WoFWA26rdyqrZJA6rFOVpr+nwwshVxFXlUCjB49STBjItz8ptf1VeTfnzAQ16pqy2/o98CvBOaKP30qkKs3yFJ2Tgy6P3hrUgVkvoJhpf"

  để cung cấp token.

  -Check aws configure: aws sts get-caller-identity

- Tạo SQS
- Tạo các table trong DynamoDB ở các file \*.js ở trong /environment/Model

### 4. Chạy trương trình

- Đi đến thư mục environment bằng lệnh "cd AWS/environment"
- Chạy lệnh "node index" để chạy trang web
