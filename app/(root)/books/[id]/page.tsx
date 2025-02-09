import { auth } from '@/auth';
import BookOverview from '@/components/bookOverview';
import BookVideo from '@/components/bookVideo';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();
    const id = (await params).id;

    //fetch data based on id
    const [bookDetails] = await db.select().from(books).where(eq(books.id, id));

    if (!bookDetails) redirect("/404")
    return (
        <>
            <BookOverview {...bookDetails} userId={session?.user?.id as string} />
            <div className='book-details'>
                <div className='flex-[1.5]'>
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>
                        <BookVideo videoUrl={bookDetails.videoUrl} />
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <h3>Summary</h3>

                        <div className='space-y-5 text-xl text-light-100'>
                            {
                                bookDetails.summary.split('\n').map((line, i) => (
                                    <p key={i}>
                                        {line}
                                    </p>
                                ))
                            }
                        </div>
                    </section>
                </div>
                {/* SIMILAR BOOKS */}
            </div>
        </>
    )
}

export default Page