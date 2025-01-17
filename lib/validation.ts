import { University } from 'lucide-react'
import { z } from 'zod'

export const signUpSchema = z.object({
    fullName : z.string().min(3),
    email : z.string().email(),
    universityId : z.coerce.number(),
    UniversityCard : z.string().nonempty("University Card is required"),
    password : z.string().min(8).max(30).nonempty("Password is required"),
})

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(30).nonempty("Password is required"),
})