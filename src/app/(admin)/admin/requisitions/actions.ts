'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import prisma from '@/lib/prisma';
import { Requisition } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function create(data: Requisition) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error('User not found');
  data.userId = session.user.id;
  await prisma.requisition.create({
    data,
  });
}
