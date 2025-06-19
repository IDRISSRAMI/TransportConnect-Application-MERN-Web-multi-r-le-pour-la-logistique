import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

const login = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@system.com',
        password: 'Admin123!'
      })
    });

    const data = await response.json();
    if (!data.token) {
      throw new Error('Échec de la connexion');
    }

    authToken = data.token;
    console.log('✅ Connecté avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    return false;
  }
};

const testDashboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    console.log('\n📊 Test Dashboard:');
    console.log(data);
  } catch (error) {
    console.error('❌ Erreur dashboard:', error.message);
  }
};

const testUpdateUserStatus = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/user/${userId}/verify`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'verifie'
      })
    });

    const data = await response.json();
    console.log('\n👤 Test Mise à jour utilisateur:');
    console.log(data);
  } catch (error) {
    console.error('❌ Erreur mise à jour:', error.message);
  }
};

const testDeleteTrip = async (tripId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/trip/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    console.log('\n🗑️ Test Suppression voyage:');
    console.log(data);
  } catch (error) {
    console.error('❌ Erreur suppression:', error.message);
  }
};

const runTests = async () => {
  console.log('🚀 Démarrage des tests...\n');

  // Connexion
  const isLoggedIn = await login();
  if (!isLoggedIn) return;

  // Test du dashboard
  await testDashboard();

  // Test de mise à jour utilisateur (remplacer l'ID)
  // await testUpdateUserStatus('ID_UTILISATEUR');

  // Test de suppression de voyage (remplacer l'ID)
  // await testDeleteTrip('ID_VOYAGE');

  console.log('\n✅ Tests terminés');
};

runTests(); 