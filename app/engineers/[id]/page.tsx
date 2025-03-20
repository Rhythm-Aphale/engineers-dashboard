import EngineerDetailsClient from './EngineerDetailsClient';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>; // Type params as a Promise
}) {
  const resolvedParams = await params; // Await the params Promise
  return <EngineerDetailsClient id={resolvedParams.id} />;
}