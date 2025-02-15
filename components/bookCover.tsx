'use client'
import { cn } from '@/lib/utils';
import React from 'react'
import BookCoverSvg from './bookCoverSvg';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantsStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface BookCoverProps {
    className?: string;
    coverColor: string;
    coverImage: string;
    variant?: BookCoverVariant;
}

const BookCover = ({
    className, coverColor = "#012B48", coverImage = "https://placehold.co/400x600.png", variant = 'regular'
}: BookCoverProps) => {
    return (
        <div className={cn('relative transition-all duration-300', variantsStyles[variant], className)}>
            <BookCoverSvg coverColor={coverColor} />

            <div className='absolute z-10 left-[12%] w-[87.5%] h-[88%]'>
                <IKImage
                    path={coverImage}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    alt='Book cover'
                    fill
                    className='rounded-sm object-fill'
                    loading='lazy'
                    lqip={{ active : true }}
                />
            </div>
        </div>
    )
}

export default BookCover