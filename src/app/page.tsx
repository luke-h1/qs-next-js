"use client";

import Layout from "@frontend/components/Layout";
import PetCard from "@frontend/components/PetCard";
import { PaginatedList } from "@frontend/types/pagination";
import { Pet } from "@frontend/types/pet";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [params, setParams] = useState({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "10",
  });

  const fetchPets = async ({
    name,
    page,
    pageSize,
  }: {
    name: string;
    page: string;
    pageSize: string;
  }) => {
    const resp = await fetch(
      `/api/pets?name=${name}&page=${page}&pageSize=${pageSize}`
    );

    const data = (await resp.json()) as PaginatedList<Pet>;

    setPets(data.results);
    setTotalPages(data.paging.totalPages);
    setTotalResults(data.paging.totalResults);
    setCurrentPage(data.paging.page);

    setParams({
      name,
      page,
      pageSize,
    });

    console.log(data);

    return data;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setParams({
      ...params,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPets(params);
    router.push(
      `/?name=${params.name}&page=${params.page}&pageSize=${params.pageSize}`
    );
  };

  useEffect(() => {
    fetchPets(params);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.info}>
          <p>Current page: {currentPage}</p>
          <p>Total results: {totalResults}</p>
          <p>Total pages: {totalPages}</p>
          <p>Page size: {params.pageSize}</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={params.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="page">Page:</label>
            <select
              id="page"
              name="page"
              value={params.page}
              onChange={handleInputChange}
            >
              {[...Array(totalPages).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pageSize">Page Size:</label>
            <select
              id="pageSize"
              name="pageSize"
              value={params.pageSize}
              onChange={handleInputChange}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        <div className={styles.results}>
          <ul className={styles.petList}>
            {pets && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
