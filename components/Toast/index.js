import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// toast.configure({ autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });

// add more config via the options object
function successToast(message, options = {}) {
  toast.success(message, { ...options });
}

function errorToast(message, options = {}) {
  toast.error(message, { ...options });
}

function warnToast(message, options = {}) {
  toast.warn(message, { ...options });
}

export { errorToast, successToast, warnToast };
