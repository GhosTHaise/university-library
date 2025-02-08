import { auth } from "@/auth";
import BookList from "@/components/bookList";
import BookOverview from "@/components/bookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))).map(book => book) as Book[];
  console.log("🚀 ~ Home ~ latestBooks:", latestBooks)

  return (
    <>
      <BookOverview
        {...latestBooks[0]}
        userId={session?.user?.id as string}
      />
      <BookList 
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}

export default Home;
