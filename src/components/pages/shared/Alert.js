import React, { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import AlertContext from "../../../context/alert/AlertContext";

const Alert = (props) => {
  const alertContext = useContext(AlertContext);
  const { alert, setAlert } = alertContext;

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setAlertArguments() {
      if (alert) {
        toast(alert.message, {
          position: alert.position,
          autoClose: alert.timeOut,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          type: alert.type,
        });
      }
    }
    // Execute the created function directly
    setAlertArguments();

    // eslint-disable-next-line
  }, [alert, setAlert]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Alert;
