// Ensure it matches your exact file name 'global.css' (no 's')


import Sidebar from '../../components/Sidebar'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function ProductsLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </aside>
        
        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}