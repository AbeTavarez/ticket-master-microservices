import {useState} from 'react';
import axios from 'axios';

export default function useRequest({url, method, body, onSuccess}) {
    const [errors, setErrors] = useState(null);

    const sendRequest = async () => {
        try {
            const res = await axios[method](url, body);

            if (onSuccess) {
              onSuccess(res.data);
            }
            
            return res.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                <h4>Ooops...</h4>
                <ul className="my-0">
                  {err.res.data.errors.map((err) => (
                    <li key={err.message}>{err.message}</li>
                  ))}
                </ul>
              </div>
            )
        }
    }

    return {sendRequest, errors}
}