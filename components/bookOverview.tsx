import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './bookCover'
import BorrowBook from './borrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface BookOverviewProps extends Book {
  userId : string;
}

const BookOverview = async({
  title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, id, userId
}: BookOverviewProps) => {
  const [user] = await db.select().from(users).where(eq(users.id , userId)).limit(1);

  if(!user) return null;

  const borrowEligibility = {
    isEligible : availableCopies > 0 && user.status === "APPROVED",
    message : availableCopies <= 0 ? 'Book is not available for borrowing' : "You are not eligible for borrowing this book"
  } 
  return (
    <section className='book-overview'>
      <div className='flex flex-1 flex-col gap-5'>
        <h1>{title}</h1>

        <div className='book-info'>
          <p>
            By <span className='font-semibold text-light-200'>{author}</span>
          </p>

          <p>
            Category{" "} <span className='font-semibold text-light-200'>{genre}</span>
          </p>

          <div className='flex gap-1'>
            <Image
              loading='lazy'
              src="/icons/star.svg"
              alt='start'
              width={22}
              height={22}
            />
            <p>
              {rating}
            </p>
          </div>
        </div>

        <div className='book-copies'>
          <p>
            Total Books : <span>{totalCopies}</span>
          </p>
          <p>
            Available Books : <span>{availableCopies}</span>
          </p>
        </div>

        <p className='book-description'>
          {description}
        </p>

        <BorrowBook
          bookId={id}
          userId={userId}
          borrowEligibility={borrowEligibility}
        />
      </div>

      <div className='relative flex flex-1 justify-center'>
        <div className='relative'>
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm-hidden'>
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview