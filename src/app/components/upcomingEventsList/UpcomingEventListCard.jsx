import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaFacebook, FaMapMarkerAlt, FaRoute, FaUser } from 'react-icons/fa';

const UpcomingEventListCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Event Banner */}
      <div className="relative h-48 w-full">
        <Image 
          src={event.bannerUrl} 
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Event Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
        
        <div className="space-y-2 mb-4">
          {/* Organizer */}
          <div className="flex items-center text-gray-600">
            <FaUser className="mr-2 text-indigo-600" />
            <span>{event.organizer}</span>
          </div>
          
          {/* Date */}
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-indigo-600" />
            <span>{event.date}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
            <span>{event.location}</span>
          </div>
          
          {/* Distance - New Field */}
          <div className="flex items-center text-gray-600">
            <FaRoute className="mr-2 text-indigo-600" />
            <span>{event.distance}</span>
          </div>
        </div>
        
        {/* Facebook Link Button */}
        <div className="mt-4">
          <Link 
            href={event.facebookUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaFacebook className="mr-2" />
            View on Facebook
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventListCard;