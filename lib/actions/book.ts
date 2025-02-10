"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
export const borrowBook = async (params : BorrowBookParams) => {
    const { userId , bookId } = params;
    try {
        const book = await db.select({availableCopies : books.availableCopies}).from(books).where(eq(books.id, bookId)).limit(1);

        if(!book.length || book[0].availableCopies <= 0){
            return {
                success : false,
                error : "Book is bnot available for borrowing",
            }
        }

        const dueDate = dayjs().add(7, 'days').toDate().toDateString();

       /*  const record = await db.insert( ) */
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "An error occured while borrowing the book",
        }
    }
}