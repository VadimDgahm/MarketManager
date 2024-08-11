import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const ToastComponent = () => {
  return (
    <ToastContainer
      autoClose={400}
      closeOnClick
      draggable
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={"top-center"}
      rtl={false}
      theme={"dark"}
    />
  );
};
