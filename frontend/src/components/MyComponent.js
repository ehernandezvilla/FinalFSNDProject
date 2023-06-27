import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const MyComponent = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "image",
          scope: "read:current_user",
        });

        const response = await fetch('http://127.0.0.1:5000/domains', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        // Hacer algo con responseData...

      } catch (e) {
        console.error(e);
      }
    };

    callApi();
  }, [getAccessTokenSilently]);

  return <div>Mi componente</div>;
};

export default MyComponent;
