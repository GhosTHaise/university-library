import { signOut } from '@/auth';
import BookList from '@/components/bookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import React from 'react'

const Page = () => {
    return (
        <>
            <form action={async () => {
                'use server';

                await signOut()
            }}
                className='mb-10'
            >
                <Button>Logout</Button>
            </form>

            <BookList
                title='Borrows Books'
                books={sampleBooks}
            />
        </>
    )
}

export default Page