import http from 'http';
import app from './app';

const port = process.env.PORT || 4444;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server running at ${port}`);
});
