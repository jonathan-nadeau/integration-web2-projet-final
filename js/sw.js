if (!self.define) {
  let e,
    t = {};
  const i = (i, s) => (
    (i = new URL(i + '.js', s).href),
    t[i] ||
      new Promise((t) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = t), document.head.appendChild(e);
        } else (e = i), importScripts(i), t();
      }).then(() => {
        let e = t[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, r) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (t[n]) return;
    let o = {};
    const d = (e) => i(e, n),
      l = { module: { uri: n }, exports: o, require: d };
    t[n] = Promise.all(s.map((e) => l[e] || d(e))).then((e) => (r(...e), o));
  };
}
define(['./workbox-c0d7f00e'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'index.js', revision: 'a658384866b828a8616637a5501d47d0' },
        { url: 'install.js', revision: '689f30e615b07faa695ed3d2f04cdad2' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
