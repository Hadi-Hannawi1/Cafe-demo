'use client'

import { useState, useRef } from 'react'
import QRCode from 'qrcode'
import { Download, Printer, QrCode, ArrowLeft, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function QRGeneratorPage() {
  const router = useRouter()
  const [numTables, setNumTables] = useState(10)
  const [qrCodes, setQrCodes] = useState<{ table: number; dataUrl: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const printRef = useRef<HTMLDivElement>(null)

  // Track navbar visibility
  useState(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setNavbarVisible(false)
        } else {
          setNavbarVisible(true)
        }
        
        setLastScrollY(currentScrollY)
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  })

  const generateQRCodes = async () => {
    if (numTables < 1 || numTables > 100) {
      toast.error('Le nombre de tables doit être entre 1 et 100')
      return
    }

    setLoading(true)
    const codes: { table: number; dataUrl: string }[] = []

    try {
      for (let i = 1; i <= numTables; i++) {
        const orderUrl = `${window.location.origin}/order?table=${i}`
        const dataUrl = await QRCode.toDataURL(orderUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#2B2D42',
            light: '#FFFFFF',
          },
        })
        codes.push({ table: i, dataUrl })
      }
      setQrCodes(codes)
      toast.success(`${numTables} codes QR générés avec succès!`)
    } catch (error) {
      toast.error('Erreur lors de la génération des codes QR')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = (table: number, dataUrl: string) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `table-${table}-qr.png`
    link.click()
    toast.success(`QR Code Table ${table} téléchargé`)
  }

  const downloadAll = () => {
    qrCodes.forEach(({ table, dataUrl }) => {
      setTimeout(() => downloadQR(table, dataUrl), table * 100)
    })
    toast.success('Téléchargement de tous les codes QR...')
  }

  const printAll = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Codes QR - Votre Café</title>
              <style>
                @media print {
                  @page { margin: 1cm; }
                  body { margin: 0; padding: 0; }
                }
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  background: white;
                }
                .grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 2rem;
                  padding: 2rem;
                }
                .card {
                  border: 2px solid #2B2D42;
                  border-radius: 1rem;
                  padding: 1.5rem;
                  text-align: center;
                  page-break-inside: avoid;
                  background: white;
                }
                .title {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: #2B2D42;
                  margin-bottom: 0.5rem;
                }
                .table-number {
                  font-size: 3rem;
                  font-weight: bold;
                  color: #8B1538;
                  margin: 1rem 0;
                }
                .qr-image {
                  width: 250px;
                  height: 250px;
                  margin: 1rem auto;
                  display: block;
                }
                .footer {
                  font-size: 0.875rem;
                  color: #666;
                  margin-top: 1rem;
                }
              </style>
            </head>
            <body>
              <div class="grid">
                ${qrCodes
                  .map(
                    ({ table, dataUrl }) => `
                  <div class="card">
                    <div class="title">Votre Café</div>
                    <div class="table-number">Table ${table}</div>
                    <img src="${dataUrl}" class="qr-image" alt="QR Code Table ${table}" />
                    <div class="footer">Scannez pour commander</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        setTimeout(() => {
          printWindow.print()
        }, 250)
      }
    }
    toast.success('Ouverture de l\'aperçu d\'impression...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2E9E4] via-[#E8DCD3] to-[#F2E9E4]">
      <Toaster position="top-center" />

      {/* Header - Adjusts position based on navbar visibility */}
      <div 
        className={`bg-gradient-to-r from-[#2B2D42] to-[#1a1b2e] border-b-4 border-[#8B1538] fixed left-0 right-0 z-50 shadow-2xl transition-all duration-300 ${
          navbarVisible ? 'top-20' : 'top-0'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3D5A80] hover:bg-[#4A6A9A] rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                title="Retour à l'accueil"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Générateur de Codes QR
                </h1>
                <p className="text-[#E07A5F] text-xs sm:text-sm font-semibold">
                  Créez des codes QR pour vos tables
                </p>
              </div>
            </div>

            {/* Right: Exit Button */}
            <button
              onClick={() => router.push('/')}
              className="hidden sm:flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl"
            >
              <Home className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Dynamic padding */}
      <div 
        className={`w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-all duration-300 ${
          navbarVisible ? 'pt-[160px] sm:pt-[180px]' : 'pt-[80px] sm:pt-[100px]'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Configuration Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 border-4 border-[#8B1538]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] mb-6 flex items-center gap-3">
              <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B1538]" />
              Configuration
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-[#2B2D42] font-bold mb-2 text-sm sm:text-base">
                  Nombre de Tables
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numTables}
                  onChange={(e) => setNumTables(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 sm:py-4 border-2 border-[#3D5A80] rounded-xl text-[#2B2D42] font-bold text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-[#8B1538]/20 focus:border-[#8B1538] transition-all"
                  placeholder="Ex: 10"
                />
              </div>
              
              <button
                onClick={generateQRCodes}
                disabled={loading}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] hover:from-[#9B1548] hover:to-[#7B1F3A] text-white rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Génération...
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
                    Générer
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Codes Grid */}
          {qrCodes.length > 0 && (
            <>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={downloadAll}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#3D5A80] to-[#2C4A66] hover:from-[#4A6A9A] hover:to-[#3A5A80] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                  Télécharger Tout
                </button>
                <button
                  onClick={printAll}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#E07A5F] to-[#C96A4F] hover:from-[#F08A6F] hover:to-[#D97A5F] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
                  Imprimer Tout
                </button>
              </div>

              {/* QR Codes Grid */}
              <div ref={printRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {qrCodes.map(({ table, dataUrl }) => (
                  <div
                    key={table}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-[#3D5A80] hover:border-[#8B1538] transition-all hover:scale-105"
                  >
                    <div className="bg-gradient-to-r from-[#2B2D42] to-[#1a1b2e] p-4 text-center">
                      <div className="text-sm text-[#E07A5F] font-bold uppercase tracking-wide">
                        Votre Café
                      </div>
                      <div className="text-4xl font-black text-white my-2">
                        Table {table}
                      </div>
                      <div className="text-xs text-white/70 font-semibold">
                        Scannez pour commander
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white">
                      <img
                        src={dataUrl}
                        alt={`QR Code Table ${table}`}
                        className="w-full h-auto rounded-xl shadow-lg mb-4"
                      />
                      <button
                        onClick={() => downloadQR(table, dataUrl)}
                        className="w-full px-4 py-3 bg-[#3D5A80] hover:bg-[#4A6A9A] text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Download className="w-5 h-5" />
                        Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {qrCodes.length === 0 && !loading && (
            <div className="text-center py-20 sm:py-32">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#3D5A80]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-[#3D5A80]" />
              </div>
              <p className="text-xl sm:text-2xl text-gray-600 font-bold mb-4">
                Configurez le nombre de tables et générez les codes QR
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Les codes QR apparaîtront ici une fois générés
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Exit Button (Mobile) */}
      <button
        onClick={() => router.push('/')}
        className="sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#8B1538] hover:bg-[#6B0F2A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        title="Retour"
      >
        <Home className="w-6 h-6" />
      </button>
    </div>
  )
}
