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
- Chạy lệnh aws configure set aws_session_token  "FwoGZXIvYXdzENj//////////wEaDMx9eAeTyNUzb7GfoyLPAVTAf/uM92HLq7fyOztI6mvHn+Nr+axpBH8pjuUrULnoex/+ji3FxsGzy3uyjm9+SIJv2TB4n8mh7TkxF8rbVarsEUUJvBAs9W93Rc57QCaSaQRUkNnrmtneFJbM1XoVpMTZdNuVz1JgQLJkimUQneg+R8paYN5e08NkAswRd7fJmQyGFdUv0j4VRA64zZth1wD/PTKlwoDxT6bvFXYhgsWXb07DK58fp+Tt3ioKjeFeBZDFXWiGltieFA7FjKy6sfFTdA+VuLN0jvsMDv/fOSjzzM+TBjItWbt+Pb4yHC1jD0QexMDRraXebdBAC6Yw83lsKEDNZjb3uggZVeKIHs7mgnIH"

  để cung cấp token.

  -Check aws configure: aws sts get-caller-identity

- Tạo SQS
- Tạo các table trong DynamoDB ở các file \*.js ở trong /environment/Model

### 4. Chạy trương trình

- Đi đến thư mục environment bằng lệnh "cd AWS/environment"
- Chạy lệnh "node index" để chạy trang web
