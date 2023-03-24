import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Records() {
  const [mydata, setMydata] = useState(null);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState([]);

  const fetchInventory = () => {
    fetch("http://127.0.0.1:5000/api", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  console.log(data);

  return (
    <>
      <main>
        <div className={styles.App}>
          <header className={styles.AppHeader}>
            <table className={styles.AppTable}>
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Timestamp</th>
                  <th>Barcode</th>
                  <th>Product</th>
                  <th>Probability</th>
                  <th>Request duration</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item[0]}>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td>{item[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className={styles.AppLinkBase + " " + styles.AppLink3}
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Home
            </button>
          </header>
        </div>
      </main>
    </>
  );
}
