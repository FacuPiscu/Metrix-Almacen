import axios from 'axios';

const testBackend = async () => {
  const url = 'https://almacenbackend.soymetrix.com/api/almacenes';
  console.log(`Checking backend at ${url}...`);
  try {
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log('Response error status:', error.response?.status);
    console.log('Response error data:', JSON.stringify(error.response?.data, null, 2));
  }
};

testBackend();
