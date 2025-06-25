const CACHE_NAME = 'my-offline-cache-v1';
const urlsToCache = [
  '/TOEIC_App', // ルートパス (多くの場合、index.htmlにリダイレクトされる)
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './sw.js'
  // オフラインで使用したいCSSファイルを追加
  // オフラインで使用したいJavaScriptファイルを追加
  // オフラインで使用したい画像ファイルを追加
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache); // ここで指定されたファイルを全てキャッシュします
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request) // リクエストされたファイルがキャッシュにあるか確認
      .then((response) => {
        if (response) {
          return response; // キャッシュにあればそれを返す
        }
        return fetch(event.request); // なければネットワークから取得
      })
  );
});