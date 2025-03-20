# Engineer Management Dashboard

A modern, responsive web application for managing engineering team members with enhanced UI/UX features.


## Features

- **Modern UI**: Clean, professional interface with gradient backgrounds, shadows, and micro-interactions
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Engineer Management**: View, search, filter, and sort engineer profiles
- **Advanced Filtering**: Filter engineers by status (Active, Inactive, On Leave)
- **Flexible Sorting**: Sort engineers by name, location, or status
- **Detailed Profiles**: Comprehensive engineer detail pages
- **Animated UI**: Smooth transitions and loading states
- **Visual Status Indicators**: Color-coded status indicators

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   gh repo clone Rhythm-Aphale/engineers-dashboard
   cd engineer-dashboard
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install required packages:
   ```bash
   npm install framer-motion
   # or
   yarn add framer-motion
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [Lucide Icons](https://lucide.dev/) - SVG icon library
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Component Overview

### Dashboard (`app/page.tsx`)
- Main landing page displaying all engineers
- Search functionality to filter engineers by name, location, or contact
- Sort functionality to order engineers by name, location, or status
- Filter functionality to show engineers by status

### Engineer Card (`components/EngineerCard.tsx`)
- Card component displaying engineer information
- Visual status indicator
- Contact information and location
- Link to detailed profile

### Engineer Details (`app/engineers/[id]/page.tsx`)
- Detailed engineer profile page
- Contact information
- Skills and availability
- Bank details
- Status indicators

## Data Structure

The application uses a JSON data structure for engineers:

```typescript
interface Engineer {
  engineerId: string;
  engineerName: string;
  engineerLocation: string;
  state: string;
  engineerStatus: string;
  engineerContact: string;
  engineerTools: string;
  availabilityDays: string;
  bankDetails: {
    bankName: string;
    ifscCode: string;
    accountNumber: string;
  };
}
```

## Styling

- **Color Scheme**: Blue gradient headers with white/light backgrounds for content
- **Status Colors**:
  - Active: Green
  - Inactive: Red
  - On Leave: Amber/Orange
- **Cards**: White cards with subtle shadows and hover effects
- **Animations**: Page transitions and loading states

## Customization

### Changing the Color Scheme

Edit the gradient classes in the dashboard and detail pages:

```jsx
<div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-64 w-full absolute top-0 left-0 -z-10" />
```

### Adding New Engineer Status Types

Update the `getStatusColor` and `getStatusIcon` functions in both `EngineerCard.tsx` and the engineer details page.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT](LICENSE)

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Lucide Icons](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
