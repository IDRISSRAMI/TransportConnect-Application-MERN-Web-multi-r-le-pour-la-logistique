import { useState } from 'react'
import { Link } from 'react-router-dom'

const NotificationBell = () => {
  const [notifications] = useState([]) // À remplacer par un vrai état
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-700">Notifications</p>
          </div>
          
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Link 
                key={notification.id} 
                to={notification.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {notification.message}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">Aucune notification</div>
          )}
          
          <div className="px-4 py-2 border-t border-gray-200">
            <Link 
              to="/notifications" 
              className="text-sm font-medium text-yellow-600 hover:text-yellow-800"
            >
              Voir toutes
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell