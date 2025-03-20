'use client'

import { notFound, useRouter } from 'next/navigation'
import engineers from '@/data/engineers.json'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, User, MapPin, Wrench, Calendar, 
  CreditCard, Building, Hash, Mail, Phone,
  CheckCircle, XCircle, Clock
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Engineer {
  engineerId: string
  engineerName: string
  engineerLocation: string
  state: string
  engineerStatus: string
  engineerContact: string
  engineerTools: string
  availabilityDays: string
  bankDetails: {
    bankName: string
    ifscCode: string
    accountNumber: string
  }
}

export default function EngineerDetailsClient({ id }: { id: string }) {
  const router = useRouter()
  const [engineer, setEngineer] = useState<Engineer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundEngineer = engineers.find(e => e.engineerId === id)
    setEngineer(foundEngineer || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-slate-600 font-medium">Loading engineer details...</p>
        </div>
      </div>
    )
  }

  if (!engineer) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-white bg-gradient-to-r from-green-500 to-emerald-600'
      case 'inactive': return 'text-white bg-gradient-to-r from-red-500 to-rose-600'
      case 'on leave': return 'text-white bg-gradient-to-r from-amber-500 to-orange-600'
      default: return 'text-white bg-gradient-to-r from-blue-500 to-sky-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <CheckCircle className="h-5 w-5" />
      case 'inactive': return <XCircle className="h-5 w-5" />
      case 'on leave': return <Clock className="h-5 w-5" />
      default: return null
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-64 w-full absolute top-0 left-0 -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Header with back button */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </Button>
        </motion.div>
        
        {/* Engineer Header Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card className="mb-8 overflow-hidden border-none shadow-xl bg-white/95 backdrop-blur-sm rounded-xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 w-full" />
            <div className="px-8 pb-8 -mt-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="rounded-full bg-slate-100 border-4 border-white h-24 w-24 flex items-center justify-center text-3xl font-bold text-slate-600 shadow-lg">
                    {engineer.engineerName.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{engineer.engineerName}</h1>
                    <div className="flex items-center gap-2 text-slate-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{engineer.engineerLocation}, {engineer.state}</span>
                    </div>
                    <p className="text-sm font-mono text-slate-500 mt-1">{engineer.engineerId}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(engineer.engineerStatus)} px-4 py-2 text-sm font-medium rounded-full flex items-center gap-2 shadow-sm`}>
                  {getStatusIcon(engineer.engineerStatus)}
                  {engineer.engineerStatus}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information */}
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-none shadow-lg bg-white/95 backdrop-blur-sm rounded-xl">
              <CardHeader className="border-b bg-slate-50/70 pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone Number</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.engineerContact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email Address</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.engineerName.toLowerCase().replace(' ', '.')}@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.engineerLocation}, {engineer.state}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tools & Availability */}
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-none shadow-lg bg-white/95 backdrop-blur-sm rounded-xl">
              <CardHeader className="border-b bg-slate-50/70 pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-purple-600" />
                  Skills & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Wrench className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Tools & Skills</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {engineer.engineerTools.split(',').map((tool, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                            {tool.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Availability</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.availabilityDays}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bank Details */}
          <motion.div variants={fadeIn} className="md:col-span-2">
            <Card className="overflow-hidden border-none shadow-lg bg-white/95 backdrop-blur-sm rounded-xl">
              <CardHeader className="border-b bg-slate-50/70 pb-4">
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-rose-600" />
                  Bank Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Building className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Bank Name</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.bankDetails.bankName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-100 p-3 rounded-full">
                      <Hash className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">IFSC Code</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-rose-100 p-3 rounded-full">
                      <CreditCard className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Account Number</p>
                      <p className="font-medium text-slate-800 text-lg">{engineer.bankDetails.accountNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}