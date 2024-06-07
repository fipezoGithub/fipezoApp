import {SERVER_URL} from '@env';

export async function useFetch(uri, method) {
  try {
    const resp = await fetch(`${SERVER_URL}${uri}`, {
      method: method,
      headers: {},
    });
    const res = await resp.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
