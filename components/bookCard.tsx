import Link from 'next/link'
import React from 'react'
import BookCover from './bookCover'
import { cn } from '@/lib/utils'

const BookCard = ({ id, title, genre, color, isLoanedBook = false, coverUrl }: Book) => {
    return (
        <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
            <Link href={`/book/${id}`}>
                <BookCover coverColor={color} coverImage={coverUrl} />

                <div className={cn('mt-4' , !isLoanedBook && "xs:max-w-40 max-w-28")}>
                    <p className='book-title'>
                        {title}
                    </p>
                    <p className='book-genre'>
                        {genre}
                    </p>
                </div>
            </Link>
        </li>
    )
}

export default BookCard