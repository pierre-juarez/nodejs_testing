import express from "express";
import { v4 } from "uuid";

const app = express();
app.use(express.json());

app.get('/ping',(req, res) =>{
  res.send('pong');
});

app.get('/task',(req, res) =>{
  res.json([]);
});

app.post('/task', (req, res) => {
  const {title, description} = req.body;

  if(!title || !description) return res.sendStatus(400);

  res.json({
    title,
    description,
    id: v4()
  });
})

export default app;