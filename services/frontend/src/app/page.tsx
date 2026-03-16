'use client'

import { useEffect, useState } from 'react'
import { Truck, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Stats {
  activeTransports: number
  pendingTransports: number
  completedToday: number
  totalRevenue: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    activeTransports: 12,
    pendingTransports: 5,
    completedToday: 8,
    totalRevenue: 15420,
  })

  const [recentTransports, setRecentTransports] = useState([
    { id: 'SC-2025-1001', status: 'in_transit', from: 'Zürich', to: 'Bern', driver: 'M. Müller' },
    { id: 'SC-2025-1002', status: 'pending', from: 'Basel', to: 'Genf', driver: '-' },
    { id: 'SC-2025-1003', status: 'delivered', from: 'Luzern', to: 'St. Gallen', driver: 'P. Weber' },
    { id: 'SC-2025-1004', status: 'accepted', from: 'Winterthur', to: 'Lausanne', driver: 'K. Schmidt' },
    { id: 'SC-2025-1005', status: 'in_transit', from: 'Chur', to: 'Biel', driver: 'A. Fischer' },
  ])

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  }

  const statusLabels: Record<string, string> = {
    pending: 'Ausstehend',
    accepted: 'Angenommen',
    in_transit: 'Unterwegs',
    delivered: 'Zugestellt',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Übersicht über Ihre Transporte</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktive Transporte</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeTransports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ausstehend</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTransports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Heute abgeschlossen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Umsatz heute</p>
              <p className="text-2xl font-bold text-gray-900">CHF {stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Aktuelle Transporte</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referenz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Von
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nach
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fahrer
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransports.map((transport) => (
                <tr key={transport.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {transport.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transport.status]}`}>
                      {statusLabels[transport.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transport.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transport.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transport.driver}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
