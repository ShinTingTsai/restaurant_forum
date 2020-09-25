# 餐廳評論網 (Restaurant Forum)

「餐廳評論網」的目標是幫助網站使用者完成以下事情：
- 找到好餐廳
- 查看餐廳的基本資訊

除了網站本身會提供豐富的餐廳資訊，也會建立使用者評論與收藏等互動功能，累積使用者的活動數據，讓值得推薦的好餐廳浮上檯面。

[DEMO](https://pure-tor-17450.herokuapp.com/)

## 介面 (Snapshot)
![image](https://i.imgur.com/35owPif.png)

![image](https://i.imgur.com/UtWpZvF.png)


## 功能 (Features)

網站使用者有「一般使用者」和「網站管理員」兩種角色

**前台**
---------
- 使用者可以註冊/登入/登出網站
- 使用者可以在瀏覽所有餐廳與個別餐廳詳細資料
- 在瀏覽所有餐廳資料時，可以用分類篩選餐廳
- 使用者可以對餐廳留下評論
- 使用者可以收藏餐廳
- 使用者可以查看最新上架的 10 筆餐廳
- 使用者可以查看最新的 10 筆評論
- 使用者可以編輯自己的個人資料
- 使用者可以查看自己評論過、收藏過的餐廳
- 使用者可以追蹤其他的使用者
- 使用者可以查看自己追蹤中的使用者與正在追蹤自己的使用者

**後台**
---------
- 只有網站管理者可以登入網站後台
- 網站管理者可以在後台管理餐廳的基本資料
- 網站管理者可以在後台管理餐廳分類

## 安裝與執行步驟 (Install)
- 下載專案到本機
```
git clone https://github.com/ShinTingTsai/restaurant_forum.git
```
- 安裝套件
```
npm install
```
- 修改.env.example檔案內容：IMGUR_CLIENT_ID等欄位需輸入自己的資訊
- 修改.env.example檔案名稱為.env
- 建立種子資料
```
npm run seed
```
- 開啟程式
```
npm run dev
```
- 請至http://localhost:3000開始使用程式

## 測試帳號 (Test Account)
Ａdmin
- email: root@example.com
- password: 12345678

User
- email: user1@example.com
- password: 12345678

## 環境建置與需求 (Built with)
- bcryptjs: v2.4.3
- body-parser: v1.19.0
- connect-flash: v0.1.1
- dotenv: v8.2.0
- Express v4.17.1
- Express-Handlebars v4.0.4
- Express-session: v1.17.1
- faker: v5.1.0
- imgur-node-api: v0.1.0
- method-override: v3.0.0
- moment: v2.28.0
- multer: 1.4.2
- mysql2: 2.1.0
- Node.js v10.15.0
- passport: v0.4.1
- passport-local: v1.0.0
- pg: v8.3.3
- sequelize: v6.3.5
- sequelize-cli: v6.2.0

## 開發人員 (Author)
Shin-Ting Tsai
