// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    fetch("http://127.0.0.1:5000/api")
      .then(async (data) => await data.json())
      .then((data) => {
        res.status(200).json(data);
      });
  } else {
    fetch("http://127.0.0.1:5000/api/")
      .then(async (data) => await data.json())
      .then((data) => {
        res.status(200).json(data);
      });
  }
}
