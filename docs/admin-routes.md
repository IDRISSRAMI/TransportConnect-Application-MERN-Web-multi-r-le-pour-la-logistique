# Documentation des Routes Administrateur

## Configuration Requise

Pour utiliser ces routes, vous devez :
1. Être authentifié (avoir un token JWT valide)
2. Avoir le rôle 'admin'
3. Envoyer le token dans le header : `Authorization: Bearer votre_token_jwt`

## Routes Disponibles

### 1. Tableau de Bord Admin
```http
GET /api/admin/dashboard
```

**Description** : Récupère les statistiques générales pour le tableau de bord administrateur.

**Exemple de requête** :
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer votre_token_jwt"
```

**Exemple de réponse réussie** :
```json
{
  "success": true,
  "data": {
    "users": 150,
    "trips": 45,
    "requests": 200,
    "acceptedRate": 75.5
  }
}
```

### 2. Mise à Jour du Statut Utilisateur
```http
PATCH /api/admin/user/:id/verify
```

**Description** : Met à jour le statut de vérification d'un utilisateur.

**Paramètres** :
- `id` : ID MongoDB de l'utilisateur (dans l'URL)
- `status` : Nouveau statut (dans le body)
  - Valeurs possibles : 'en_attente', 'verifie', 'rejete'

**Exemple de requête** :
```bash
curl -X PATCH http://localhost:5000/api/admin/user/123456789/verify \
  -H "Authorization: Bearer votre_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"status": "verifie"}'
```

**Exemple de réponse réussie** :
```json
{
  "success": true,
  "data": {
    "id": "123456789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "status": "verifie",
    "isVerified": true
  }
}
```

### 3. Suppression d'un Voyage
```http
DELETE /api/admin/trip/:id
```

**Description** : Supprime un voyage et toutes ses requêtes associées.

**Paramètres** :
- `id` : ID MongoDB du voyage (dans l'URL)

**Exemple de requête** :
```bash
curl -X DELETE http://localhost:5000/api/admin/trip/123456789 \
  -H "Authorization: Bearer votre_token_jwt"
```

**Exemple de réponse réussie** :
```json
{
  "success": true,
  "message": "Voyage et requêtes associées supprimés avec succès"
}
```

## Gestion des Erreurs

### Format des Erreurs
Toutes les erreurs suivent le même format :
```json
{
  "success": false,
  "message": "Message d'erreur descriptif"
}
```

### Erreurs Communes

1. **Token Manquant ou Invalide** (401)
```json
{
  "success": false,
  "message": "Accès refusé. Token manquant"
}
```

2. **Accès Non Autorisé** (403)
```json
{
  "success": false,
  "message": "Accès refusé. Le rôle expediteur n'est pas autorisé"
}
```

3. **Ressource Non Trouvée** (404)
```json
{
  "success": false,
  "message": "Utilisateur non trouvé"
}
```

4. **Validation Échouée** (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "status",
      "message": "Status invalide. Valeurs possibles: en_attente, verifie, rejete"
    }
  ]
}
```

## Notes Importantes

1. Toutes les routes nécessitent une authentification valide
2. Le token JWT doit être inclus dans le header Authorization
3. Seuls les utilisateurs avec le rôle 'admin' peuvent accéder à ces routes
4. Les IDs doivent être des IDs MongoDB valides
5. Les réponses incluent toujours un champ "success" indiquant si l'opération a réussi 