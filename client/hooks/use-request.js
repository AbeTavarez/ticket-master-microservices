import {useState} from 'react';
import axios from 'axios';

export default function useRequest({url, method, body}) {
    const [errors, setErrors] = useState(null);

    const sendRequest = async () => {
        try {
            const res = await axios[method](url, body);
            return res.data;
        } catch (e) {
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