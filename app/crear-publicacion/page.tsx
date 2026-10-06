import { sala } from "@/app/data/mock";
import { getKidsBySala } from "@/app/data/kids";
import CreatePostForm from "@/components/create-post-form";

export default function Page() {
  const kids = getKidsBySala(sala.nombre);

  return <CreatePostForm kids={kids} salaNombre={sala.nombre} />;
}
