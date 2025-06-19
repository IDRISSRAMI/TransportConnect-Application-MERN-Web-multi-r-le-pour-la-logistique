// server.js - Version mise à jour
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/user.js'; // Importation du routeur user

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes de test
app.get('/test1', (req, res) => res.json({ message: 'Test 1 OK' }));
app.get('/test2/:id', (req, res) => res.json({ message: 'Test 2 OK', id: req.params.id }));
app.put('/test3/:token', (req, res) => res.json({ message: 'Test 3 OK', token: req.params.token }));

// Routes principales
console.log('Configuration des routes...');

// Routes d'authentification
app.post('/api/auth/register', (req, res) => res.json({ message: 'Register OK' }));
app.post('/api/auth/login', (req, res) => res.json({ message: 'Login OK' }));
app.put('/api/auth/resetpassword/:resettoken', (req, res) => {
  res.json({ message: 'Reset password OK', token: req.params.resettoken });
});

// Routes utilisateur (utilise le routeur importé)
app.use('/api/users', userRoutes);

// Routes voyage
app.post('/api/trips', (req, res) => res.json({ message: 'Create trip OK' }));
app.get('/api/trips', (req, res) => res.json({ message: 'Get trips OK' }));
app.get('/api/trips/me', (req, res) => res.json({ message: 'Get my trips OK' }));

// Routes demande
app.post('/api/requests', (req, res) => res.json({ message: 'Create request OK' }));
app.get('/api/requests/me', (req, res) => res.json({ message: 'Get my requests OK' }));
app.get('/api/requests/trip/:tripId', (req, res) => res.json({ message: 'Get requests for trip OK' }));
app.patch('/api/requests/:id', (req, res) => res.json({ message: 'Respond to request OK' }));

// Routes admin
app.get('/api/admin/dashboard', (req, res) => res.json({ message: 'Dashboard OK' }));
app.patch('/api/admin/user/:id/verify', (req, res) => res.json({ message: 'Verify user OK' }));
app.delete('/api/admin/trip/:id', (req, res) => res.json({ message: 'Delete trip OK' }));

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'API fonctionnelle!',
    endpoints: {
      users: '/api/users',
      auth: '/api/auth',
      trips: '/api/trips',
      requests: '/api/requests',
      admin: '/api/admin'
    }
  });
});

// Gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});