import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const ToastComponent = () => {
  return (
    <ToastContainer
      autoClose={3000}
      closeOnClick
      draggable
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={"bottom-right"}
      rtl={false}
      theme={"dark"}
    />
  );
};
