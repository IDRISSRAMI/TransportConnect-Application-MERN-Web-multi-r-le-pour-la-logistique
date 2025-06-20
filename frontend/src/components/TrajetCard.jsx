import { Link } from 'react-router-dom'

const TrajetCard = ({ trajet }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">
            {trajet.depart} → {trajet.destination}
          </h3>
          <p className="text-gray-600">Par {trajet.conducteur?.prenom} {trajet.conducteur?.nom}</p>
        </div>
        {trajet.conducteur?.badgeVerifie && (
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            Vérifié
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Type marchandise:</span> {trajet.typeMarchandise}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Capacité:</span> {trajet.capaciteDisponible} kg
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Dimensions max:</span> {trajet.dimensionsMax}
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          to={`/trajet/${trajet._id}`} 
          className="btn-secondary px-4 py-2 rounded"
        >
          Voir détails
        </Link>
      </div>
    </div>
  )
}

export default TrajetCard