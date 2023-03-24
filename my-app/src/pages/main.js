import Result from "./result";
import styles from "@/styles/Home.module.css";
import { useRef, useState } from "react";
import Records from "./records";

export default function Main() {
  const hiddenFileInput = useRef(null);
  const [imageData, setImageData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitedForm, setSubmitedForm] = useState(false);
  const [displayRecords, setDisplayRecords] = useState(false);

  const handleFormSubmit = () => {
    const body = new FormData();
    body.append("image", selectedFile);

    fetch("http://127.0.0.1:5000/api", {
      body: body,
      method: "post",
    })
      .then((res) => res.json())
      .then((data) => {
        setImageData(data);
      });
  };

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.log(selectedFile);
    }
  };

  if (!submitedForm && !displayRecords) {
    return (
      <>
        <main>
          <div className={styles.App}>
            <header className={styles.AppHeader2}>
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleFormSubmit();
                  setSubmitedForm(true);
                }}
              >
                <div className={styles.AppSection}>
                  <label className={styles.AppInput} htmlFor="image">
                    Choose file
                  </label>
                  <p className={styles.fileUploadText}>
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </p>
                  <input
                    className={styles.AppHide}
                    id="image"
                    name="image"
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <button className={styles.AppLinkBase}>Submit</button>
                </div>
              </form>
              <div>
                <button
                  className={styles.AppLinkBase + " " + styles.AppLink2}
                  onClick={() => {
                    setDisplayRecords(true);
                  }}
                >
                  Records
                </button>
              </div>
            </header>
          </div>
        </main>
      </>
    );
  } else if (submitedForm) {
    return (
      <>
        <main>
          <div className={styles.App}>
            <header className={styles.AppHeader2}>
              <div>
                {imageData.map((data) => (
                  <p>{data.description}</p>
                ))}
              </div>
              <div>
                <button
                  className={styles.AppLinkBase + " " + styles.AppLink2}
                  onClick={() => {
                    setSubmitedForm(false);
                  }}
                >
                  Home
                </button>
                <button
                  className={styles.AppLinkBase + " " + styles.AppLink2}
                  onClick={() => {
                    setSubmitedForm(false);
                    setDisplayRecords(true);
                  }}
                >
                  Records
                </button>
              </div>
            </header>
          </div>
        </main>
      </>
    );
  } else if (displayRecords) {
    return (
      <>
        <Records />
      </>
    );
  }
}
