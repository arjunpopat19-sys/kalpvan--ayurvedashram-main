import { useState, useEffect } from 'react';
import { Treatment } from '../data/treatments';

const API_URL = 'http://localhost:5000/api/treatments';

export const useTreatments = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch treatments');
      const data = await res.json();
      setTreatments(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  return { treatments, loading, error, refetch: fetchTreatments };
};
