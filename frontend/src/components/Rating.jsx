import { useState } from 'react'

const Rating = ({ rating, setRating, editable = false }) => {
  const [hover, setHover] = useState(null)

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        
        return (
          <button
            key={i}
            type={editable ? "button" : "div"}
            className={`${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'} text-2xl`}
            onClick={() => editable && setRating(ratingValue)}
            onMouseEnter={() => editable && setHover(ratingValue)}
            onMouseLeave={() => editable && setHover(null)}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}

export default Rating