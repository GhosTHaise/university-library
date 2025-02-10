"use client"

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';

interface BorrowBookProps {
    userId: string;
    bookId: string;
    borrowEligibility: {
        isEligible: boolean;
        message: string;
    }
}

const BorrowBook = ({
    userId, bookId, borrowEligibility: { isEligible, message }
}: BorrowBookProps) => {
    const router = useRouter()
    const [borrowing, setBorrowing] = React.useState(false);

    const handleBorrowBook = async () => {
        if (!isEligible) {
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive'
            })

            return;
        }

        setBorrowing(true);

        try {
            const result  = await borrowBook({
                bookId,
                userId
            })

            if(result.success){
                toast({
                    title : 'Success',
                    description : "Book borrowed the book",
                })

                router.push('/');
            }else{
                throw new Error(result.message);
            }
        } catch (error) {
            toast({
                title : 'Error',
                description : "An error occurred while borrowing the book",
                variant : 'destructive'
            })
        }finally{
            setBorrowing(false);
        }
    }
    return (
        <Button className='book-overview_btn' onClick={handleBorrowBook} disabled={borrowing}>
            <Image src="/icons/book.svg" alt='book' width={20} height={20} />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {borrowing ? "Borrowing ..." : "Borrow Book"}
            </p>
        </Button>
    )
}

export default BorrowBook