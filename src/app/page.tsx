import {Title} from "@/src/app/components/title/title";
import {Socials} from "@/src/app/components/socials/socials";
import {Travel} from "@/src/app/components/travel/travel";

export default function Home() {
  return <div className={"relative flex flex-col w-full min-h-screen p-8 bg-gradient-to-r from-zinc-200 to-zinc-300"}>
    <div className={"flex self-end"}>
      <Socials/>
    </div>
    <div className={"flex flex-1 items-center justify-center"}>
      <Title/>
    </div>
    <div className={"flex items-end justify-start"}>
      <Travel/>
    </div>
  </div>;
}