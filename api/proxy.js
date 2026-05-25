export default async function handler(req, res) {

  const trailingPath = req.url.replace(/^\/game-proxy/, '');
  const targetUrl = `https://cdn.startmyeducation.us${trailingPath}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Accept': req.headers['accept'] || '*/*',
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(`Target origin error: ${response.status}`);
    }


    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }


    const data = await response.arrayBuffer();
    return res.send(Buffer.from(data));

  } catch (error) {
    return res.status(500).send('Proxy failure: ' + error.message);
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};
