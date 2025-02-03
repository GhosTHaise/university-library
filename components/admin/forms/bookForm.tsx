"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z} from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { bookSchema } from '@/lib/validation'

interface BookFormProps extends Partial<Book> {
    type: 'create' | 'edit'
}

const BookForm = ({ type, ...book }: BookFormProps) => {

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name={'title'}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book Title
                            </FormLabel>
                            <FormControl>
                                        <Input
                                            required
                                            placeholder="Book Title"
                                            {...field}
                                            className='book-form_input'
                                        />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default BookForm
