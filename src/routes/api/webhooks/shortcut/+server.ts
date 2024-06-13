import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { IP_INFO_TOKEN } from '$env/static/private'

export const POST: RequestHandler = async ({  url, fetch  }) => {
  const userIp = url.searchParams.get('ip')
  const URL = `https://ipinfo.io/${userIp}?token=${IP_INFO_TOKEN}`;
  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    return json(data)
  })
  .catch((err) => {
    return error(err);
  });
  return json({message: 'something went wrong with ip lookup'})
}
