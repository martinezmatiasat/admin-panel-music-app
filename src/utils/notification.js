import { toast } from 'react-hot-toast';

const notifySuccess = (message = 'Operación realizada') => {
  toast.success(message, {
    style: {
      padding: '16px',
      margin: '16px',
      color: '#FFFAEE',
      background: '#009900ff',
    },
    iconTheme: {
      primary: '#009900ff',
      secondary: '#FFFAEE',
    },
  });
};

const notifyError = (error) => {
  let message = '';

  if (error.response) {
    message = error.response.data?.message || 'Error del servidor';
    console.error(error.response.data?.error || error.response);
  } else if (error.request) {
    message = 'No se pudo conectar con el servidor';
    console.error(error.request);
  } else {
    message = 'Error en el cliente';
    console.error(error.message);
  }

  toast.error(message, {
    style: {
      padding: '16px',
      margin: '16px',
      color: '#FFFAEE',
      background: '#e01b1bff',
    },
    iconTheme: {
      primary: '#e01b1bff',
      secondary: '#FFFAEE',
    },
  });
};

export { notifySuccess, notifyError };