import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { IP_INFO_TOKEN } from '$env/static/private'

export const GET: RequestHandler = async ({  url, fetch  }) => {
  const userIp = url.searchParams.get('ip')
  console.log('userIp:', userIp)
  const URL = `https://ipinfo.io/${userIp}?token=${IP_INFO_TOKEN}`;
  console.log('URL:', URL)
  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    console.log('data:', data)
    return json(data)
  })
  .catch((err) => {
    console.log('err:', err)
    return error(err);
  });
  return json({message: 'something went wrong with ip lookup'})
}
