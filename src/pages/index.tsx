import Link from "next/link";
import HeaderBar from "./components/headerBar";
import WelcomeMessage from "./components/welcomeMessage";
import CurrentlyReading from "./components/currentlyReading";

export default function Home({currentlyReading} : {currentlyReading: []}) {
  return (
    <div className="bg-slate-100 text-center">
      <HeaderBar />
      <div className="bg-slate-100 text-start ml-56">
        <WelcomeMessage name={"Yazan"} />
        <div className="flex ">
          <CurrentlyReading books={currentlyReading}/>

        </div>
      </div>
      <Link href="/profile" className="text-blue-500 underline mt-4 inline-block">
        Go to Profile Page
      </Link>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch('https://bookclub-backend.nn.r.appspot.com/api/v1/98aac522330f4c29882dcfd3736822ad/shelves');
  const data = await res.json();

  return {
    props: {
      currentlyReading: data.currently_reading.books,
      want_to_read : data.want_to_read.books,
      previously_read : data.previously_read.books,
    },
  };
}