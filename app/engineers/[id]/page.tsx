import EngineerDetailsClient from './EngineerDetailsClient'

export default function EngineerDetailsPage({ params }: { params: { id: string } }) {
  return <EngineerDetailsClient params={{ id: params.id }} />
}