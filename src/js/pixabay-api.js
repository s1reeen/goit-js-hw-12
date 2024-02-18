import axios from 'axios';

export async function pixabayApi(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
