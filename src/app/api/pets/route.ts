import { PaginatedList } from "@frontend/types/pagination";
import { Pet } from "@frontend/types/pet";
import { NextRequest } from "next/server";
import pets from "./pets";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const name = searchParams.get("name") || "";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(name.toLowerCase())
  );

  const start = (parseInt(page) - 1) * parseInt(pageSize);
  const end = start + parseInt(pageSize);

  const paginatedPets = filteredPets.slice(start, end);

  const result: PaginatedList<Pet> = {
    paging: {
      query: name,
      page: parseInt(page),
      totalPages: Math.ceil(filteredPets.length / parseInt(pageSize)),
      totalResults: filteredPets.length,
    },
    results: paginatedPets,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
