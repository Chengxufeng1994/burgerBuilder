import { useState, useEffect } from 'react';

export default (HttpClient) => {
  const [error, setError] = useState(null);
  const reqInterceptors = HttpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptors = HttpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      HttpClient.interceptors.request.eject(reqInterceptors);
      HttpClient.interceptors.response.eject(resInterceptors);
    };
  }, [HttpClient.interceptors.request, HttpClient.interceptors.response, reqInterceptors, resInterceptors]);

  const errorConfirmHandler = () => {
    setError(null);
  };

  return [error, errorConfirmHandler];
};
