import { cn } from "@/lib/utils";
import MemberForm from "./_components/MemberForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getGenerations } from "@/lib/api/getGenarations";
import { getPositions } from "@/lib/api/getPositions";

export default async function Members() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["generations"],
      queryFn: getGenerations,
    }),
    queryClient.prefetchQuery({
      queryKey: ["positions"],
      queryFn: getPositions,
    }),
  ]);

  return (
    <div className={cn("h-full w-full")}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MemberForm />
      </HydrationBoundary>
    </div>
  );
}
