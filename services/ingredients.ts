import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"
import { Ingredient } from "@prisma/client"

export const search = async (query: string): Promise<Ingredient[]> => {
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.SEARCH_INGREDIENTS, {params: {query}})

    return data
}