import { ChangeEvent } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event?.target?.files[0]) {
      const size = 20 * 1024 * 1024;
      const reader = new FileReader();
      let buffer;
      const file = event.target.files[0];
      reader.onload = async function (e: any) {
        buffer = new Uint8Array(e.target.result);
        for (let i = 0; i < buffer.length; i += size) {
          const fd = new FormData();
          fd.append("fname", [file.name, i + 1, "of", buffer.length].join("-"));
          fd.append("media", new Blob([buffer.subarray(i, i + size)]));
          await axios.post("http://localhost:3000/media", fd, {
            onUploadProgress: (uploadEv) => console.log(uploadEv.estimated),
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileUpload} />
    </>
  );
}

export default App;
