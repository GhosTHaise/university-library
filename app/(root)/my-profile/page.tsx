import { auth } from '@/auth';
import BookList from '@/components/bookList';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import React from 'react'

const Page = async () => {
    const session = await auth()
    const latestBooks = (await db.select({
        id : books.id,
        title: books.title,
        genre: books.genre, 
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
    }).from(borrowRecords).innerJoin(books, eq(borrowRecords.bookId, books.id)).where(eq(borrowRecords.userId, session?.user?.id!)).limit(10).orderBy(desc(books.createdAt))) as Book[];

    return (
        <>
            <BookList
                title='Borrows Books'
                books={latestBooks}
                containerClassName='w-dvw'
            />
        </>
    )
}

export default Page