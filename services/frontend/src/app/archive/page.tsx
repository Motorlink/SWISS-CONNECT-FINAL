'use client'

import { useState } from 'react'
import { Search, Calendar, RefreshCw, Eye, Download } from 'lucide-react'

interface ArchivedTransport {
  id: string
  reference: string
  customer: string
  origin: string
  destination: string
  completedDate: string
  price: number
  driver: string
}

export default function ArchivePage() {
  const [transports, setTransports] = useState<ArchivedTransport[]>([
    {
      id: '101',
      reference: 'SC-2025-0901',
      customer: 'Meier AG',
      origin: 'Zürich',
      destination: 'Basel',
      completedDate: '2025-12-10',
      price: 380,
      driver: 'M. Müller',
    },
    {
      id: '102',
      reference: 'SC-2025-0902',
      customer: 'Schmidt GmbH',
      origin: 'Bern',
      destination: 'Genf',
      completedDate: '2025-12-09',
      price: 520,
      driver: 'P. Weber',
    },
    {
      id: '103',
      reference: 'SC-2025-0903',
      customer: 'Weber Transport',
      origin: 'Luzern',
      destination: 'Zürich',
      completedDate: '2025-12-08',
      price: 180,
      driver: 'K. Schmidt',
    },
    {
      id: '104',
      reference: 'SC-2025-0904',
      customer: 'Huber Logistik',
      origin: 'St. Gallen',
      destination: 'Winterthur',
      completedDate: '2025-12-07',
      price: 290,
      driver: 'A. Fischer',
    },
    {
      id: '105',
      reference: 'SC-2025-0905',
      customer: 'Meier AG',
      origin: 'Zürich',
      destination: 'Lausanne',
      completedDate: '2025-12-06',
      price: 650,
      driver: 'M. Müller',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const handleRebook = async (transport: ArchivedTransport) => {
    // TODO: API-Aufruf zum Wiederbuchung
    alert(`Transport ${transport.reference} wird neu gebucht...`)
  }

  const filteredTransports = transports.filter((t) => {
    const matchesSearch =
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesDate = true
    if (dateFrom) {
      matchesDate = matchesDate && t.completedDate >= dateFrom
    }
    if (dateTo) {
      matchesDate = matchesDate && t.completedDate <= dateTo
    }

    return matchesSearch && matchesDate
  })

  const totalRevenue = filteredTransports.reduce((sum, t) => sum + t.price, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Archiv</h1>
        <p className="text-gray-500">Abgeschlossene Transporte durchsuchen und wiederverwenden</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Suche nach Referenz, Kunde, Strecke..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Von"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Bis"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Gefundene Transporte</p>
          <p className="text-2xl font-bold text-gray-900">{filteredTransports.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Gesamtumsatz</p>
          <p className="text-2xl font-bold text-gray-900">CHF {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Durchschnittspreis</p>
          <p className="text-2xl font-bold text-gray-900">
            CHF {filteredTransports.length > 0 ? Math.round(totalRevenue / filteredTransports.length) : 0}
          </p>
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
                Kunde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Abgeschlossen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransports.map((transport) => (
              <tr key={transport.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {transport.reference}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transport.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {transport.origin} → {transport.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transport.completedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  CHF {transport.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRebook(transport)}
                      className="inline-flex items-center px-3 py-1 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Neu buchen
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
