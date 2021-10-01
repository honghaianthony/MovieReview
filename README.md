# Documentation 

Quy định và quy trình làm việc

## Quy định 

- Khi bắt đầu làm một tính năng mới cần checkout branch mới từ branch local với tên của mình hoặc tên phù hợp với tính năng.

    Ví dụ: khuong-duy-login.

    `git checkout local`

    `git checkout -b <branch name>`

- Sau khi hoàn thành code thì đặt tên commit một cách ngắn gọn dễ hiểu bằng tiếng anh.

- Nếu thấy tính năng mình làm đã xong thì báo cáo với leader để tiến hành họp và test tính năng sau đó merge code vào branch chính.

## Cấu trúc thư mục 

    /src
    |
    |- /routes thư mục này dùng để định nghĩa các route.
    |- /models thư mục này dùng để định nghĩa các model.
    |- /controllers thư mục này chứa các controller của model thao tác xử lý logic chủ yếu nằm ở đây.
    |- /public đây là thư mục chứa các file tĩnh như hình ảnh, văn bản, ...
    |- /config Thư mục chứa các file config cho server, database, ...

## Cách chạy source code

1. Những thứ cần cài đặt trước: 

    - Git Bash
    - Microsoft SQL Server
    - Nodejs
2. Tiến hành chạy source 
    
    - Clone git repository 

        Mở terminal tại thư mục muốn đặt source code

        `git clone https://gitlab.com/khuongduy172/movie_review.git`

    - Tạo database trong My SQL

        `CREATE DATABASE <>`

    - Chạy code

        Tiếp tục ở terminal vừa clone git repository về

        `cd movie_review/`

        `npm i`

        `npm run dev`
    
    - Lưu ý luôn phải kiểm tra xem phiên bản mới nhất của file .env trong project của mình, nếu có cập nhật .env phải báo cho leader và gửi nội dung cho leader.

