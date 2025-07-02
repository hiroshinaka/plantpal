import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from "../components/NavBar/NavBar";
import PlantList from '../components/PlantList/PlantList';
import Garden from '../components/Garden/Garden';

export default function Main() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while checking auth state
  }

  return (
    <div>
      <NavBar />
      <PlantList />
      <Garden />
    </div>
  );
}