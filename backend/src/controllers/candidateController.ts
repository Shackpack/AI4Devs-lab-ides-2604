import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, address, education, experience } = req.body;

    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        education: {
          create: education || []
        },
        experience: {
          create: experience || []
        }
      },
      include: {
        education: true,
        experience: true
      }
    });

    res.status(201).json({ message: 'Candidate created successfully', candidate });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Failed to create candidate' });
  }
};

export const getCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
      include: {
        education: true,
        experience: true,
        documents: true
      }
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    if (candidate.deletedAt) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ candidate });
  } catch (error) {
    console.error('Error retrieving candidate:', error);
    res.status(500).json({ error: 'Failed to retrieve candidate' });
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address, education, experience } = req.body;

    const candidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        education: education ? {
          deleteMany: {},
          create: education
        } : undefined,
        experience: experience ? {
          deleteMany: {},
          create: experience
        } : undefined
      },
      include: {
        education: true,
        experience: true
      }
    });

    res.status(200).json({ message: 'Candidate updated successfully', candidate });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Failed to update candidate' });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const candidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() }
    });

    res.status(200).json({ message: 'Candidate deleted successfully', candidate });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
};
