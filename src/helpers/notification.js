import { toast } from 'react-hot-toast';

const notifySuccess = (message = 'Operación exitosa') => {
  toast.success(message);
};

const notifyError = (error) => {
  if (error.response) {
    toast.error(error.response.data?.message || 'Error del servidor');
    console.error(error.response.data?.error || error.response);
  } else if (error.request) {
    toast.error('No se pudo conectar con el servidor');
    console.error(error.request);
  } else {
    toast.error('Error en el cliente');
    console.error(error.message);
  }
}

export { notifySuccess, notifyError };