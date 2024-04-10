'use server';
import prisma from '@/lib/prisma';
import { Requisition } from '@prisma/client';

export async function create(data: Requisition) {
  await prisma.requisition.create({
    data,
  });
}
