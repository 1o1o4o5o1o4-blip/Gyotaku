# Scratch Studio Members Web Application

Scratchスタジオのメンバー一覧を管理・公開するWebアプリケーションです。

## 機能

- 📚 **スタジオID登録**: ユーザーがスタジオIDを入力して登録
- 🔄 **自動更新**: 毎日0時にScratch APIからメンバーデータを自動取得
- 👥 **メンバー一覧表示**: マネージャーとキュレーターを分かりやすく表示
- 🔗 **共有機能**: 公開リンクをコピーしてシェア可能
- 📱 **レスポンシブデザイン**: モバイルにも対応

## セットアップ

### 必要な環境
- Node.js 14+
- npm or yarn

### インストール

```bash
cd scratch-studio-members/backend
npm install
```

### 環境変数設定

```bash
cp .env.example .env
# .envファイルを編集してデータベースの接続情報を設定
```

### 起動

```bash
npm start
```

サーバーは `http://localhost:3000` で起動します。

## API仕様

### スタジオ登録
- `POST /api/studios` - スタジオを登録
- `GET /api/studios` - 登録されたスタジオ一覧を取得
- `DELETE /api/studios/:id` - スタジオを削除

### メンバー取得
- `GET /api/studios/:studioId/members` - スタジオのメンバー一覧を取得

## ディレクトリ構造

```
scratch-studio-members/
├── backend/
│   ├── package.json
│   ├── app.js
│   ├── db.js
│   ├── routes/
│   │   ├── studios.js
│   │   ├── members.js
│   │   └── share.js
│   ├── tasks/
│   │   └── batch-update.js
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── members.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       └── api.js
└── README.md
```

## ライセンス

MIT
