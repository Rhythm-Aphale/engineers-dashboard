import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { MapPin, Phone, BadgeCheck, ArrowUpRight, Clock, Wrench } from 'lucide-react'
import { Engineer } from "@/lib/types"

interface EngineerCardProps {
  engineer: Engineer
  className?: string
}

export function EngineerCard({ engineer, className }: EngineerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'inactive': return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
      case 'on leave': return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-sky-600 text-white';
    }
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden border-none shadow-md bg-white/90 backdrop-blur-sm", 
      className
    )}>
      <div className={cn(
        "h-2 w-full absolute top-0 left-0",
        getStatusColor(engineer.engineerStatus)
      )} />
      
      <CardContent className="p-6 pt-8">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-slate-100 h-12 w-12 flex items-center justify-center text-lg font-bold text-slate-600 shadow-sm border border-slate-200">
                {engineer.engineerName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                  {engineer.engineerName}
                  {engineer.engineerStatus === 'Active' && (
                    <BadgeCheck className="h-5 w-5 text-green-600" />
                  )}
                </h3>
                <p className="text-xs text-slate-500 font-mono">{engineer.engineerId}</p>
              </div>
            </div>
            
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              getStatusColor(engineer.engineerStatus)
            )}>
              {engineer.engineerStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-sm">{engineer.engineerContact}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-green-100 p-1.5 rounded-full">
                <MapPin className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span className="text-sm">
                {engineer.engineerLocation}, {engineer.state}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-purple-100 p-1.5 rounded-full">
                <Wrench className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <span className="text-sm truncate" title={engineer.engineerTools}>
                {engineer.engineerTools}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600">
              <div className="bg-amber-100 p-1.5 rounded-full">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <span className="text-sm">
                {engineer.availabilityDays}
              </span>
            </div>
          </div>

          <Link
            href={`/engineers/${engineer.engineerId}`}
            className="inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-2.5 mt-2 group-hover:shadow-md"
          >
            View Full Profile
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}