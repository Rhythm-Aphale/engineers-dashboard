'use client'

import { Input } from '@/components/ui/input'
import { EngineerCard } from '@/components/EngineerCard'
import engineers from '@/data/engineers.json'
import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Search, ArrowUpDown, Filter } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEngineers = useMemo(() => {
    // First apply search filter
    let result = engineers.filter(engineer =>
      [engineer.engineerName, engineer.engineerContact, engineer.engineerLocation, engineer.state]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    
    // Then apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(engineer => 
        engineer.engineerStatus.toLowerCase() === statusFilter.toLowerCase()
      )
    }
    
    // Then sort
    return result.sort((a, b) => {
      let valueA, valueB;
      
      switch(sortBy) {
        case 'name':
          valueA = a.engineerName;
          valueB = b.engineerName;
          break;
        case 'location':
          valueA = a.engineerLocation;
          valueB = b.engineerLocation;
          break;
        case 'status':
          valueA = a.engineerStatus;
          valueB = b.engineerStatus;
          break;
        default:
          valueA = a.engineerName;
          valueB = b.engineerName;
      }
      
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }, [searchTerm, sortBy, sortOrder, statusFilter]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-64 w-full absolute top-0 left-0 -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-12 text-center"
        >
          <h1 className=" text-3xl md:text-5xl font-bold mb-4 text-black drop-shadow-md">
            Engineering Team Management
          </h1>
          <p className="text-lg text-black/90 max-w-2xl mx-auto">
            Find and manage all engineering team members in one place
          </p>
        </motion.div>
        
        <Card className="mb-8 bg-white/95 backdrop-blur-md border-none rounded-xl shadow-2xl -mt-6">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              Find Engineers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search by name, location or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-6 rounded-lg border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-slate-50/80"
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-white">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter('all')} className={statusFilter === 'all' ? 'bg-slate-100' : ''}>
                      All Engineers
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('active')} className={statusFilter === 'active' ? 'bg-slate-100' : ''}>
                      Active Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('inactive')} className={statusFilter === 'inactive' ? 'bg-slate-100' : ''}>
                      Inactive Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('on leave')} className={statusFilter === 'on leave' ? 'bg-slate-100' : ''}>
                      On Leave
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-white">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'bg-slate-100' : ''}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('location')} className={sortBy === 'location' ? 'bg-slate-100' : ''}>
                      Location
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('status')} className={sortBy === 'status' ? 'bg-slate-100' : ''}>
                      Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleSortOrder}>
                      Order: {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-slate-500">
                <span className="font-medium">{filteredEngineers.length}</span> engineers found
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>Sorted by:</span>
                <span className="font-medium capitalize">{sortBy}</span>
                <span>({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredEngineers.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEngineers.map((engineer, index) => (
              <motion.div key={engineer.engineerId} variants={item}>
                <EngineerCard 
                  engineer={engineer}
                  className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg"
          >
            <div className="text-center space-y-4">
              <Search className="h-12 w-12 mx-auto text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-700">
                No engineers found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}