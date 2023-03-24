import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Result() {
  const [mydata, setMydata] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setMydata(data);
        setLoading(false);
        console.log(mydata);
      });
  }, []);

  return (
    <>
      <main>
        <div className={styles.App}>
          <header className={styles.AppHeader2}>
            <div>
              <p>{mydata ? mydata[0][description] : "Waiting..."}</p>
            </div>
          </header>
        </div>
      </main>
    </>
  );
}
