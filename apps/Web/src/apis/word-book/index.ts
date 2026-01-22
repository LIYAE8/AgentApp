import { serverApi } from "..";
import type { WordQuery,WordList } from "@en/common/word";
import type { Response } from "..";
export const getWordListApi = (params: WordQuery): Promise<Response<WordList>> => {
    return serverApi.get('/word-book', {params}) as Promise<Response<WordList>>
}