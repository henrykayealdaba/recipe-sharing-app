import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function useRecipes(endpoint, searchTerm = '') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get(endpoint, {
          params: searchTerm ? { ingredient: searchTerm } : {},
          signal: controller.signal,
        });

        setData(res.data.recipes || res.data.favorites || []);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint, searchTerm]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginatedData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    data: paginatedData,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    setData,
  };
}
