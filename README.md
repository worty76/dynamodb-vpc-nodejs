# Đồ án xây dụng web serverless trên dịch vụ đám mây AWS

Thực hiện tạo một webside serverless quản lý sinh viên đơn giản sử dụng dịch vụ
DynamoDB và Lambda của AWS

## Hướng dẫn cài đặt

### 1. Cài đặt một máy ảo EC2

- Tạo máy ảo EC2 Cloud9Ubuntu cấu hình thì tùy theo nhu cầu sử dụng.
- Tạo lần lượt các giao thức SSH, HTTP, HTTPS và một giao thức có Port là 8889
  để truy cập web cho máy ảo.

### 2. Tạo 1 địa chỉ ElasticIP và gán nó vào máy ảo EC2 vừa tạo

### 3. Thực hiện cấu hình máy ảo

- Chạy lệnh "sudo apt-get update" để cập nhật phiên bản mới nhất, "sudo apt-get
  install npm" để cài đặt Nodejs.
- Chạy lệnh aws configure và cung cấp lần lượt các thông tin AWS Access Key ID,
  AWS Secret Access Key, Default region name, Default output format.
- Chạy lệnh aws configure set aws_session_token
  "FwoGZXIvYXdzEID//////////wEaDGJbTwefLfU4yIRtCyLPAU8Azn4l79e9T6gEaL5qlq0Z0Hcst3qSDlrT6bxqgjgtttyxbDz8SitWw67qoeokf1rVzOPJ8VFPDyoNwThWJ+J5YfAQAe4RzB9svby4OU1A/ZBeukOkcfey6JJf0TnO0tm/h7ze1DmjCAhKnSJXlEoeiXoaKVYuQSUXAMQjm7IUR6OjkeRl9ASgwaBGr+afQx/UQbYgMvPuZ33IsNJ3SNayLLT/tO7cMAjWQfDz0j58WFTCzWUTYtL/3ORlVcL79cXSUmI//Wc0YPFas/7HoijUs/STBjItYgvTlS9dqZJpHNAD8KWaaNzZLzzF3OfNbAxvDlSOlqdKwkXEmyZ6MJR4L9cw"

  để cung cấp token.

  -Check aws configure: aws sts get-caller-identity

- Tạo thêm các Simple queue service, 25 sqs
  (ChangePass,DeleteDiemm,DeleteGV,DeleteKhoa,DeleteLop,DeleteMonHoc,DeletePhanCong,DeleteSV,Delete_Account,InsertDiem,InsertGV,InsertLop,InsertMonHoc,InsertPhanCong,InsertSV,Insert_Account,UpdateDiem,UpdateGV,UpdateKhoa,UpdateLop,UpdateMonHoc,UpdatePhanCong,UpdateSV,Update_Account,test,
  )
- Tạo các 8 tables in Dynamodb
  (Account,Diems,GiangViens,Khoas,Lops,MonHocs,PhanCongs,SinhViens)
- Tạo các table trong DynamoDB ở các file \*.js ở trong /environment/Model

### 4. Chạy trương trình

- Đi đến thư mục environment bằng lệnh "cd AWS/environment"
- Chạy lệnh "node index" để chạy trang web

### 5. VPC

- Tạo vpc: aws ec2 create-vpc-endpoint --vpc-id vpc-086106c39d2c8ae5c
  --service-name com.amazonaws.us-east-1.dynamodb --route-table-ids
  rtb-0a374d0d08f4479fb

### 6. Chú ý

- kill port: sudo kill -9 $(sudo lsof -t -i:3000)
