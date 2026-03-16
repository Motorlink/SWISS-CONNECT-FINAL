'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, ChevronDown } from 'lucide-react'

interface Transport {
  id: string
  reference: string
  status: string
  customer: string
  origin: string
  destination: string
  plannedPickup: string
  price: number
  driver: string | null
}

export default function TransportsPage() {
  const [transports, setTransports] = useState<Transport[]>([
    {
      id: '1',
      reference: 'SC-2025-1001',
      status: 'in_transit',
      customer: 'Meier AG',
      origin: 'Zürich, Bahnhofstrasse 10',
      destination: 'Bern, Bundesplatz 1',
      plannedPickup: '2025-12-16 10:00',
      price: 450,
      driver: 'M. Müller',
    },
    {
      id: '2',
      reference: 'SC-2025-1002',
      status: 'pending',
      customer: 'Schmidt GmbH',
      origin: 'Basel, Marktplatz 5',
      destination: 'Genf, Rue du Rhône 20',
      plannedPickup: '2025-12-16 14:00',
      price: 680,
      driver: null,
    },
    {
      id: '3',
      reference: 'SC-2025-1003',
      status: 'delivered',
      customer: 'Weber Transport',
      origin: 'Luzern, Pilatusstrasse 15',
      destination: 'St. Gallen, Multergasse 8',
      plannedPickup: '2025-12-15 09:00',
      price: 320,
      driver: 'P. Weber',
    },
    {
      id: '4',
      reference: 'SC-2025-1004',
      status: 'accepted',
      customer: 'Huber Logistik',
      origin: 'Winterthur, Technikumstrasse 3',
      destination: 'Lausanne, Place de la Gare 12',
      plannedPickup: '2025-12-16 16:00',
      price: 590,
      driver: 'K. Schmidt',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  }

  const statusLabels: Record<string, string> = {
    pending: 'Ausstehend',
    accepted: 'Angenommen',
    in_transit: 'Unterwegs',
    delivered: 'Zugestellt',
    archived: 'Archiviert',
  }

  const filteredTransports = transports.filter((t) => {
    const matchesSearch =
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Auftragsliste</h1>
          <p className="text-gray-500">Verwalten Sie Ihre Transportaufträge</p>
        </div>
        <Link
          href="/transports/new"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Neuer Auftrag
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Referenz oder Kunde..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          >
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="accepted">Angenommen</option>
            <option value="in_transit">Unterwegs</option>
            <option value="delivered">Zugestellt</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                Kunde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Abholung
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fahrer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransports.map((transport) => (
              <tr key={transport.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/transports/${transport.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {transport.reference}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transport.status]}`}
                  >
                    {statusLabels[transport.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transport.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>{transport.origin.split(',')[0]}</div>
                  <div className="text-gray-400">→ {transport.destination.split(',')[0]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transport.plannedPickup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  CHF {transport.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transport.driver || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
