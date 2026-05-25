import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  target: 'https://cdn.startmyeducation.us',
  changeOrigin: true,
  autoRewrite: true,
});

export default function handler(req, res) {
  req.url = req.url.replace(/^\/api\/proxy/, '');

  return new Promise((resolve, reject) => {
    proxy.web(req, res, {}, (err) => {
      if (err) {
        res.status(500).send('Proxy error: ' + err.message);
        return reject(err);
      }
      resolve();
    });
  });
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
