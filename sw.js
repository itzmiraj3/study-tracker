/* Study Time Tracker service worker.
   - Shows reminders that the open app asks for (Android Chrome requires notifications to come from here).
   - Opens the matching screen when a notification is tapped.
   It does NOT receive background push: with the app closed, no reminder is sent. */
const APP_PAGE = 'index.html';                       /* the home page; each screen is reached with a #/screen hash */
const DESTS = ['home','focus','insights','history','planner','tasks','exams','notes','calendar','library','notifs','settings','profile','subjects','revision','habits'];
const safeDest = d => (DESTS.indexOf(d) !== -1 ? d : 'home');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

/* Network-only for this site's own files: the app always loads its latest version (no stale cache).
   Other origins (Firebase, fonts) are left to the browser. */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const dest = safeDest(event.notification.data && event.notification.data.dest);
  event.waitUntil((async () => {
    const scope = self.registration.scope;
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = windows.find(c => c.url.indexOf(scope) === 0);
    if (open) {
      await open.focus();
      open.postMessage({ type: 'nav', dest: dest });
      return;
    }
    await self.clients.openWindow(new URL(APP_PAGE + '#/' + dest, scope).href);
  })());
});
