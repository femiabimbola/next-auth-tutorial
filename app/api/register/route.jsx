import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';


export const POST = async (request) => {
  const body = await request.json();
  const { name, email, password } = body;

  //  Check the field
  if(!name || !email || !password ){
    return new NextResponse('Missing Fields', { status: 400})
  }

  // Email must be unique
  const exist = await prisma.user.findUnique({
    where : { email}
  })

  if (exist) throw new Error('Email already Exist')

  //  The number is the salt
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, hashedPassword}
  })

  return NextResponse.json(user, {status: 201})
}