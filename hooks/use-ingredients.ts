import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useState, useEffect } from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchIngr() {
            try {
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchIngr()
    },[])

    return { ingredients, loading  }
}