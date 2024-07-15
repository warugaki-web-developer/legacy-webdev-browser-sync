# Web Development Starter Kit

このプロジェクトは、レガシーなフロントエンド開発のための最小限のスタートキットです。  
HTML、CSS（PostCSS）、JavaScript のためのツールと設定を提供します。

## 前提条件

- Node.js v20.14.0
- npm v10.7.0

## 初回セットアップ

依存関係をインストール:

```sh
npm ci
```

## プロジェクト構成

```plaintext
.
├── _configs
│   └── paths.js
├── _tasks
│   ├── build-assets.js
│   ├── build-css.js
│   ├── build-html.js
│   ├── build-js.js
│   ├── cleanup.js
│   └── generate-sitemap.js
├── dist
├── public
├── src
│   ├── pages
│   ├── scripts
│   └── styles
├── eslint.config.mjs
├── .prettierrc.cjs
├── .stylelintrc.cjs
├── bs-config.js
├── package.json
├── postcss.config.cjs
└── README.md
```

## npm scripts

### ビルド

dist ディレクトリをクリーンアップ:

```sh
npm run clean
```

全アセット（CSS, JS, HTML, 公開ファイル）をビルド:

```sh
npm run build
```

### 開発

開発サーバーを起動し、ファイルをウォッチ:

```sh
npm run dev
```

### サイトマップ生成

dist 内のファイルから sitemap.xml を生成:  
※要ビルド

```sh
npm run generate-sitemap
```

## 設定ファイル

### _configs/paths.js

ビルドやウォッチスクリプトで使用されるパス設定を含むファイル。

### postcss.config.js

autoprefixer や postcss-preset-env などのプラグインを含む PostCSS の設定。

### .eslintrc.js

JavaScript と HTML ファイルをリントするための ESLint 設定。

### .stylelintrc.json

CSS ファイルをリントするための Stylelint 設定。

### .prettierrc

CSS と JS ファイルをフォーマットするための Prettier 設定。

### bs-config.js

ファイルを提供し、変更があったときにブラウザをリロードするための BrowserSync 設定。


## 開発ワークフロー

1. プロジェクトをビルド:

```sh
npm run build
```

2. ファイルウォッチ付きで開発サーバーを起動:

```sh
npm run dev
```

3. ビルド後にサイトマップを生成:（任意）

```sh
npm run generate-sitemap
```

## ファイルの追加と削除

### ファイルの追加:

`src` に新しいファイルを追加すると、ウォッチスクリプトによって自動的に検出され、`dist` にビルドされます。

### ファイルの削除:
`src` からファイルを削除すると、`dist` 内の対応するファイルも自動的に削除されます（`npm run dev` or `npm run watch:cleanup` を実行している場合）。
