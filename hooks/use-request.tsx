import axios from "axios";
import { useState } from "react";

export default ({ url, method, body }) => {
  const [errors, setError] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      setError(null); 
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;

      setError(
        <div>
          <ul>
            {Array.isArray(errors) ? (
              errors.map((e, index) => (
                <li key={index} className="text-red-500">
                  {e.message}
                </li>
              ))
            ) : (
              <li className="text-red-500">
                Something went wrong
              </li>
            )}
          </ul>
        </div>
      );
    }
  };

  return { errors, doRequest };
};
