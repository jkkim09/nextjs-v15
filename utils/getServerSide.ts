import { headers } from 'next/headers';

export const getServerSideUrlPath = async () => {
  const headersList = headers();
  const referer = (await headersList).get('referer'); // ex) localhost:3000
  return referer || '';
};
