'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Build breadcrumb items from path
  const pathSegments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      // Format the label (capitalize, replace hyphens with spaces)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return { label, href }
    })
  ]

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-blue-600">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}