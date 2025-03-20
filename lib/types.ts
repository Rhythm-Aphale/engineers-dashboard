export interface Engineer {
    engineerId: string
    engineerName: string
    engineerContact: string
    engineerStatus: string
    state: string
    engineerLocation: string
    engineerTools: string
    availabilityDays: string
    bankDetails: {
      bankName: string
      ifscCode: string
      accountNumber: string
    }
  }