async function getApiResponse<T>(path: string, params?: URLSearchParams): Promise<T> {
  const url = new URL(`${import.meta.env.VITE_API_SERVER_URL}${path}`)
  if (params !== undefined) {
    url.search = params.toString()
  }

  const response = await fetch(url.href, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    mode: "cors",
    credentials: "omit",
  })

  return await response.json()
}

export async function getCartoonCostar(name: string): Promise<Api.GetCartoonCostarResponse> {
  return await getApiResponse(`cartoon/costar/${name}`)
}

export async function getCharacterNameList(): Promise<Api.IdolNameListResponse> {
  return await getApiResponse('idol_name/list')
}
