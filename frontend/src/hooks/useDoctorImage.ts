import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import staticDoctorImg from "@/assets/doctor.jpg";

export const useDoctorImage = () => {
  const [doctorImg, setDoctorImg] = useState<string>(staticDoctorImg);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings/homePageDoctorImage`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.value) {
            setDoctorImg(`${API_BASE_URL}${data.value}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch doctor image setting", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  return { doctorImg, loading };
};
