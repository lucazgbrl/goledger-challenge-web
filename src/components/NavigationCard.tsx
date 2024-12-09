import Link from 'next/link';

const NavigationCard = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <p className="mt-2 text-gray-300">{description}</p>
    <Link legacyBehavior href={href}>
      <a className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        See {title}
      </a>
    </Link>
  </div>
);

export default NavigationCard;