'use client'

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

interface Props{
    className?: string
}

export const SearchInput: React.FC<Props> = ({className}) => {

    const [focused, setFocused] = useState(false)
    const ref = useRef(null)

    useClickAway(ref, () => {

    })


    return (
        <>
        <div className={cn("fixed inset-0 bg-black/50 z-30 opacity-0 invisible transition-all duration-200", focused && "visible opacity-100")} onClick={() => setFocused(false)}>

        </div>
        <div ref={ref} className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
            <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 "/>
            <input className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
             placeholder="Что-же еще тут есть..."
             type="text" 
             onFocus={() => setFocused(true)}
             />
        <div className={cn("absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30", focused && 'visible opacity-100 top-12')}>
            <Link href={'/products/search/'} className="">
                <div className="px-3 py-2  duration-200 hover:bg-zinc-500/20 cursor-pointer flex gap-2 items-center">
                <img src="https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif" alt="pizza1img" width={48} />
                Sushi1
                </div>
            </Link>
        </div>
        </div>
        </>
    )
}