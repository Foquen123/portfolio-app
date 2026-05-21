import Form from '@/components/Form/Form';
import prisma from '@/lib/prisma';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id },
    include: { previews: { orderBy: { index: 'asc' } } },
  });

  if (!project) {
    return <div>not found</div>;
  }
  return (
    <div>
      <Form initialData={project}></Form>
    </div>
  );
}
