import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // توجيه المستخدم إلى لوحة التحكم
    router.replace('/dashboard');
  }, []);

  return null;
}
