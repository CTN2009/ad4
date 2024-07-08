# README #


## プロダクト説明

### このプロダクトは?
* CTN様からの受注した、車査定の申込フォームになります
* いわゆる入力フォームとは異なり、チャットを模した動きをする画面になります。

### 画面の構成について
* 全ての入力フォームを表示するのではなく、`１つ以上のinputを表示 -> 入力 -> validate ->  次のinputを表示`という流れになります


### 入力内容の送信について
* 申込フォームの入力内容は、formのpostメソッドで送信します。  
* 例外として、SMS認証と住所検索は非同期通信で対応しています。

---
## 利用言語、フレームワークについて

### 言語

* TypeScript
* HTML
* CSS

### UIフレームワーク
* [Svelte](https://svelte.jp/)

### ビルドツール
* [Vite](https://ja.vitejs.dev/)

### その他
`package.json`をご確認ください


---
## 開発環境について

### 開発に必要な環境
* Node.js v18.19.0以上が動作すること  
* npm v10.2以上

---
### 開発環境の構築 ###
1. Node.jsがv18.19.0以上である事を確認します。
1. `package.json`があるディレクトリに移動します。
1. パッケージをinstallします。（`npm ci`を実行）
1. install時にエラーがなければ、開発環境の構築は完了です

---
### 開発環境（ローカルサーバ）の起動
1. `package.json`があるディレクトリで、`npm run dev`を実行します。
1. 以下のメッセージが出力されれば起動完了です。 
```
> ctn-lp@0.0.0 dev
> NODE_ENV=local vite

Re-optimizing dependencies because vite config has changed

  VITE v5.0.12  ready in 310 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.10.105:5173/
  ➜  press h + enter to show help
```

* サーバ起動後は、「Local」のURLからページの閲覧が可能です。 
* srcディレクトリ配下のファイルが監視対象になります。  
編集を保存すると画面に反映されます。

#### 注意事項
* 設定ファイルを変更した場合は、開発環境の再起動を推奨します。
* packageをinstallした場合は、開発環境の再起動を推奨します。


---
## production buildについて

### production buildの内容
本番環境用に以下のものを出力します。

* main.js
* main.umd.cjs
* style.css
* ＊＊＊.webp（imageファイル一式）
* index.html（画面確認用）

#### 注意
* index.htmlは画面確認用になります。本番環境にアップする必要はありません
* main.umd.cjsは、今回の様な利用の場合は不要です。本番環境にアップする必要はありません


### build先
`dist`ディレクトリ

---
### production build（本番用ファイルのbuild）方法
1.  ルートにて、`npm run build`を実行します。  正常に終了すれば、js・cssファイルが`dist`に出力されます

### 本番用ファイルをローカルで確認したい場合
1.  ルートにて、`npm run preview`を実行します。  buildが実行されます。  正常に終了すれば、ファイルを確認するためのサーバが起動します。


### 注意事項
* 利用されていない変数やcss classが存在する場合、誤ったHTML構造の場合、Viteが警告を出力します。  
その場合はbuildは実行されていません。
* build前に、distディレクトリを空にする設定を追加しています。  
削除したくないファイルがある場合は退避をお願いします。



---
## build構成の説明

### ライブラリモードに設定した理由
バックエンドの状況が不明だったため、HTMLベース以外でも利用できる事を考えました。  
結果として、bundleファイルを常に同じ名前で出力するライブラリモードでのbuildを選択しました。

参考：[Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)

### ライブラリモードを取りやめる場合
今後御社での運用開始後、htmlファイルでのwebアプリにする判断をされた場合は、build方式の変更を推奨します。  
その場合は、`vite.config.ts`の`lib`フィールドを`build`フィールドから外して、設定を修正してください

参考：[Vite: building for Production](https://vitejs.dev/guide/build.html#building-for-production)


### phpファイルと連携させたい場合
以下のページを参考にしてください。

参考：[Vite: バックエンドとの統合](https://ja.vitejs.dev/guide/backend-integration.html)


---
## アプリのコンポーネント構成

`src/App.svelte`  --|
                    |--`src/pages/personal/Personal.svelte` （個人情報の画面）
                    |--`src/pages/vehicle/Vehicle.svelte` （車両情報の画面）

＊それぞれの画面を構成する共通コンポーネントは`src/shared/components`に設置してあります


---
## テストについて
validationで利用する正規表現に対して、ユニットテストを整備してあります。

### テストファイル
`src/__tests__/validate/validate.test.ts`

### テストツール
`vitest`

### テストの実行方法
`npm run test`
