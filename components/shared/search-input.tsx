'use client'

import { cn } from "@/lib/utils"
import { Api } from "@/services/api-client"
import { Product } from "@prisma/client"
import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useClickAway, useDebounce } from "react-use"

interface Props{
    className?: string
}

export const SearchInput: React.FC<Props> = ({className}) => {

    const [focused, setFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const ref = useRef(null)

    useClickAway(ref, () => {

    })

    useDebounce( async () => {
        try {
           const response = await Api.products.search(searchQuery)
           setProducts(response)
        } catch (error) {
            console.log(error)
        }
    },
    150,
    [searchQuery])

    const onClickItem = () => {
        setFocused(false)
        setSearchQuery('')
        setProducts([])
    }


    return (
        <>
        <div className={cn("fixed inset-0 bg-black/50 z-30 opacity-0 invisible transition-all duration-200", focused && "visible opacity-100")} onClick={() => setFocused(false)}>

        </div>
        <div ref={ref} className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
            <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 "/>
            <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value )}
            maxLength={25}
            className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
             placeholder="Что-же еще тут есть..."
             type="text" 
             onFocus={() => setFocused(true)}
             />
      {products.length > 0 && (
        <div className={cn("absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30", focused && 'visible opacity-100 top-12')}>
            {products.map((product, idx) => (
                <Link href={`/product/${product.id}`} key={idx} className="" onClick={onClickItem}>
                    <div className="px-3 py-2  duration-200 hover:bg-zinc-500/20 cursor-pointer flex gap-2 items-center">
                    <img src={`${product.imageUrl}`} 
                    alt={`${product.name}`} 
                    width={48} />
                    {product.name}
                    </div>
                </Link>
            ))}
        </div>
    )} 
        </div>
        </>
    )
}