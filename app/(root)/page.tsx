import BookList from "@/components/bookList";
import BookOverview from "@/components/bookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);

  return (
    <>
      <BookOverview
        {...sampleBooks[0]}
      />
      <BookList 
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}

export default Home;
