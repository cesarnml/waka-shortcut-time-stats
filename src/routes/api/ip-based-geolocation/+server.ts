import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { IP_INFO_TOKEN } from '$env/static/private'

export const POST: RequestHandler = async ({  url, fetch  }) => {
  const userIp = url.searchParams.get('ip')
  console.log('userIp:', userIp)
  const URL = `https://ipinfo.io/${userIp}?token=${IP_INFO_TOKEN}`;
  console.log('URL:', URL)
  fetch(URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
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

export const OPTIONS: RequestHandler = async () => {
  return json({
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS methods
      'Access-Control-Allow-Headers': 'Content-Type' // Allow only Content-Type header
    },
    body: ''
  })
};