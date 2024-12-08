import Link from 'next/link';

const Card = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <p className="mt-2 text-gray-300">{description}</p>
    <Link legacyBehavior href={href}>
      <a className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        See {title}
      </a>
    </Link>
  </div>
);

export default Card;