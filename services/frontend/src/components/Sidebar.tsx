'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Truck,
  Plus,
  List,
  MapPin,
  Archive,
  Receipt,
  FileText,
  MessageSquare,
  Clock,
  LayoutDashboard,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Neuer Auftrag', href: '/transports/new', icon: Plus },
  { name: 'Auftragsliste', href: '/transports', icon: List },
  { name: 'Live-Tracking', href: '/tracking', icon: MapPin },
  { name: 'Archiv', href: '/archive', icon: Archive },
  { name: 'Abrechnung', href: '/billing', icon: Receipt },
  { name: 'Dokumente', href: '/documents', icon: FileText },
  { name: 'Zeiterfassung', href: '/time', icon: Clock },
  { name: 'Support', href: '/support', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Truck className="w-8 h-8 text-red-600" />
        <span className="ml-3 text-xl font-bold text-gray-900">
          SWISS-CONNECT
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${
                  isActive ? 'text-red-600' : 'text-gray-400'
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">AD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@swiss-connect.ch</p>
          </div>
        </div>
      </div>
    </div>
  )
}
