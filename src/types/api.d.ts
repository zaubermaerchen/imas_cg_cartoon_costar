declare namespace Api {
  export interface CartoonCostar {
    name: string
    count: number
  }

  export type GetCartoonCostarResponse = CartoonCostar[]

  export interface IdolNameListResponse {
    names: string[]
  }
}
