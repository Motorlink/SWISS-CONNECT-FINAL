'use client'

import { useState, useEffect } from 'react'
import { MapPin, Truck, Clock, Navigation } from 'lucide-react'

interface TrackingTransport {
  id: string
  reference: string
  driver: string
  status: string
  origin: string
  destination: string
  currentLocation: {
    lat: number
    lng: number
    address: string
  }
  eta: string
  progress: number
}

export default function TrackingPage() {
  const [transports, setTransports] = useState<TrackingTransport[]>([
    {
      id: '1',
      reference: 'SC-2025-1001',
      driver: 'M. Müller',
      status: 'in_transit',
      origin: 'Zürich',
      destination: 'Bern',
      currentLocation: {
        lat: 47.1235,
        lng: 8.2318,
        address: 'A1, bei Aarau',
      },
      eta: '14:30',
      progress: 65,
    },
    {
      id: '2',
      reference: 'SC-2025-1004',
      driver: 'K. Schmidt',
      status: 'in_transit',
      origin: 'Winterthur',
      destination: 'Lausanne',
      currentLocation: {
        lat: 46.9481,
        lng: 7.4474,
        address: 'A1, bei Bern',
      },
      eta: '17:15',
      progress: 40,
    },
    {
      id: '3',
      reference: 'SC-2025-1005',
      driver: 'A. Fischer',
      status: 'in_transit',
      origin: 'Chur',
      destination: 'Biel',
      currentLocation: {
        lat: 47.0502,
        lng: 8.3093,
        address: 'A3, bei Luzern',
      },
      eta: '15:45',
      progress: 55,
    },
  ])

  const [selectedTransport, setSelectedTransport] = useState<TrackingTransport | null>(
    transports[0]
  )

  // Simuliere Echtzeit-Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTransports((prev) =>
        prev.map((t) => ({
          ...t,
          progress: Math.min(100, t.progress + Math.random() * 2),
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live-Tracking</h1>
        <p className="text-gray-500">Verfolgen Sie Ihre Transporte in Echtzeit</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transport Liste */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Aktive Transporte</h2>
          {transports.map((transport) => (
            <div
              key={transport.id}
              onClick={() => setSelectedTransport(transport)}
              className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-all ${
                selectedTransport?.id === transport.id
                  ? 'border-red-500 ring-2 ring-red-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-blue-600">{transport.reference}</span>
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                  <Truck className="w-3 h-3 mr-1" />
                  Unterwegs
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-green-500" />
                  {transport.origin}
                </div>
                <div className="flex items-center mt-1">
                  <Navigation className="w-4 h-4 mr-1 text-red-500" />
                  {transport.destination}
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Fortschritt</span>
                  <span>{Math.round(transport.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${transport.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-gray-500">Fahrer: {transport.driver}</span>
                <span className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-1" />
                  ETA: {transport.eta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Karte (Simulation) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-96 bg-gray-100 flex items-center justify-center relative">
              {/* Simulierte Karte */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Schweiz Umriss (vereinfacht) */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full opacity-20"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M50,150 L100,100 L150,80 L200,90 L250,70 L300,100 L350,120 L340,180 L300,200 L250,220 L200,210 L150,220 L100,200 L60,180 Z"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="2"
                  />
                </svg>

                {/* Fahrzeug-Marker */}
                {selectedTransport && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                    style={{
                      left: `${30 + selectedTransport.progress * 0.4}%`,
                      top: `${40 + Math.sin(selectedTransport.progress / 10) * 10}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-red-500 rounded-full opacity-20 animate-ping" />
                      <div className="relative bg-red-600 text-white p-2 rounded-full shadow-lg">
                        <Truck className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info-Overlay */}
              {selectedTransport && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedTransport.reference}
                      </p>
                      <p className="text-sm text-gray-500">
                        Aktueller Standort: {selectedTransport.currentLocation.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Geschätzte Ankunft</p>
                      <p className="text-lg font-bold text-red-600">
                        {selectedTransport.eta}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Details */}
          {selectedTransport && (
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tracking-Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Abgeholt</p>
                    <p className="text-sm text-gray-500">{selectedTransport.origin}</p>
                    <p className="text-xs text-gray-400">09:15 Uhr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Unterwegs</p>
                    <p className="text-sm text-gray-500">
                      {selectedTransport.currentLocation.address}
                    </p>
                    <p className="text-xs text-gray-400">Jetzt</p>
                  </div>
                </div>
                <div className="flex items-start opacity-50">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Zustellung</p>
                    <p className="text-sm text-gray-500">{selectedTransport.destination}</p>
                    <p className="text-xs text-gray-400">ETA: {selectedTransport.eta}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
