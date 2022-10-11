import Link from 'next/link';

export default function AuthLinkText({ href, children }) {
  return (
    <Link href={href}>
      <span className="block text-blue-600 underline cursor-pointer">
        {children}
      </span>
    </Link>
  );
}
