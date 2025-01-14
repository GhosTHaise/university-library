import BookList from "@/components/bookList";
import BookOverview from "@/components/bookOverview";
import { sampleBooks } from "@/constants";

const Home = () => {
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
