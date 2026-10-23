import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EntryList } from "@/components/entry-list";
import { getEntries } from "@/lib/posts";

// How many recent logs the home shows before "전체 기록 보기"
const RECENT_LOGS = 3;

export default function Home() {
  const logs = getEntries("log");
  return (
    <div className="prose dark:prose-invert prose-h2:mt-2">
      <section
        id="author"
        className="flex flex-col gap-6 items-center justify-center py-6 mx-auto"
      >
        <Avatar className="w-32 h-32">
          <AvatarImage
            className="m-0"
            alt="Author's avatar"
            src="https://github.com/sleeep23.png"
          />
          <AvatarFallback>
            <p>DS</p>
          </AvatarFallback>
        </Avatar>
        <div className="text-center max-w-md mx-auto flex flex-col">
          <h3 className="text-2xl font-bold mt-0 mb-1">Dongho Seo</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0 mb-3">
            Researcher at SYMPLE Lab, GIST
          </p>
          <p className="text-gray-600 dark:text-gray-200 my-0">
            Immerse, then simplify.
          </p>
        </div>
      </section>
      <section id="writing">
        <h3 className="text-2xl font-bold font-mono">Writing</h3>
        <p className="text-sm text-gray-500 mt-0">
          만들면서 고민한 것들을 공들여 정리한 글입니다. 연구 이야기는{" "}
          <a href="https://dongho-seo.me" target="_blank">
            dongho-seo.me
          </a>
          에 있어요.
        </p>
        <EntryList entries={getEntries("writing")} />
      </section>
      <section id="logs" className="mt-12">
        <h3 className="text-2xl font-bold font-mono">Logs</h3>
        <p className="text-sm text-gray-500 mt-0">
          공부하고 만들면서 남긴 가벼운 기록입니다.
        </p>
        <EntryList entries={logs.slice(0, RECENT_LOGS)} />
        <p className="text-sm mt-6">
          <Link
            href="/logs"
            className="text-gray-500 no-underline hover:underline"
          >
            전체 기록 보기 →
          </Link>
        </p>
      </section>
    </div>
  );
}
