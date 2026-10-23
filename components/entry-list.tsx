import { PostListItem, SeriesListItem } from "@/components/post-list-item";
import type { ListEntry } from "@/lib/posts";

export function EntryList({ entries }: { entries: ListEntry[] }) {
  return entries.map((entry) =>
    entry.type === "series" ? (
      <SeriesListItem key={entry.series.slug} series={entry.series} />
    ) : (
      <PostListItem key={entry.post.slug} post={entry.post} />
    ),
  );
}
