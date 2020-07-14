import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Used to display error or success message 
 * Takes requestErrors & requestSuccess as params
 */

export default (props) => {
//   console.log(props.requestErrors);
//   console.log(props.requestSuccess);
  if (props.requestErrors && props.requestErrors.length !== 0) {       
    return props.requestErrors.map((msg) => {
      const notify = () => toast.error(msg);
      notify();
      return <ToastContainer />;
    });
  }
  if (props.requestSuccess && props.requestSuccess.length !== 0) {   
    return props.requestSuccess.map((msg) => {
      const notify = () => toast.success(msg);
      notify();
      return <ToastContainer />;
    });
  }
};