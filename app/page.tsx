import { Metadata } from "next";
import CardLocation from "@/components/CardLocation";
import { getAll } from "@/models/base";

export default async function Home() {
  const data = await getAll();

  return (
    <section className="flex  flex-col items-center p-3   md:p-24">
      <h1 className="text-center text-lg font-extrabold py-5">All Locations</h1>
      <div className="flex flex-wrap py-5 w-full ">
        {data.map((el: any) => (
          <CardLocation key={el.id} {...el} />
        ))}
      </div>
    </section>
  );
}
export const metadata: Metadata = {
  title: "Homepage",
  description: "Search your favourite location",
};
