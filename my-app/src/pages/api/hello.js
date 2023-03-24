// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch("http://127.0.0.1:5000/api/hello")
    .then(async (data) => await data.json())
    .then((data) => {
      res.status(200).json(data);
    });
}
