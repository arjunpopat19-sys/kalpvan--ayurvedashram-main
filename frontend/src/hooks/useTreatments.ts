import { useState, useEffect } from 'react';
import { Treatment, treatments as defaultTreatments } from '../data/treatments';
import { API_BASE_URL } from '../lib/api';

const API_URL = `${API_BASE_URL}/api/treatments`;

export const useTreatments = () => {
  // Start with static data immediately — no empty flash
  const [treatments, setTreatments] = useState<Treatment[]>(defaultTreatments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch treatments');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setTreatments(data);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
      // Keep showing static data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  return { treatments, loading, error, refetch: fetchTreatments };
};
