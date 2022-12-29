# note-clone

note クローン（Text Rich Editor）のリポジトリです。

## Overview

- Headless rich text WYSIWYG editors の Tiptap を採用する

https://tiptap.dev/introduction

![image](https://user-images.githubusercontent.com/65071534/209815422-6ef3342b-b627-456a-862f-2061362a9dcc.png)

## 環境

- react ^18.2.0
- sass ^1.57.1
- @tiptap/react ^2.0.0-beta.209

## Installation

- Install React TypeScript Vite

```bash
$ npm create vite
$ npm install
```

- Install Tiptap

```bash
$ npm install @tiptap/react @tiptap/starter-kit
$ npm install prosemirror-keymap prosemirror-commands prosemirror-schema-list prosemirror-history prosemirror-dropcursor prosemirror-gapcursor
```

- Install Scss (CSS Modules)

```bash
npm i sass sass-loader
```

- ローカル開発用 URL を開き動作確認をする

```bash
$ npm run dev
```

http://127.0.0.1:5173/

- 上記の手順で失敗する場合 [Troubleshoot](#Troubleshoot)を確認してください

## How to

- なし

## Troubleshoot

- なし

## その他ドキュメント
