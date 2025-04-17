import Image from 'next/image';
import Link from 'next/link';
import { FaBehance, FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const TeamCard = ({ member }) => {
  // Map social icons to their components
  const getSocialIcon = (type) => {
    const iconMap = {
      linkedin: <FaLinkedin size={20} />,
      facebook: <FaFacebook size={20} />,
      youtube: <FaYoutube size={20} />,
      website: <FaGlobe size={20} />,
      twitter: <FaTwitter size={20} />,
      instagram: <FaInstagram size={20} />,
      github: <FaGithub size={20} />,
      behance: <FaBehance size={20} />
    };
    
    return iconMap[type] || null;
  };

  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
      <div className="aspect-square relative overflow-hidden">
        <Image 
          src={member.image} 
          alt={member.name} 
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-5 text-center">
        <h3 className="text-white text-xl font-bold">{member.name}</h3>
        <p className="text-orange-500 mt-1 font-medium">{member.title}</p>
        
        <div className="flex justify-center gap-3 mt-3">
          {member.socials.map((social, index) => (
            <Link 
              href={social.url} 
              key={index}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {getSocialIcon(social.type)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;