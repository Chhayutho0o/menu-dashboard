import React from 'react'
import { notFound } from 'next/navigation'
import { fetchCategory } from '@/actions/categories'
import CategoryForm from '@/components/categories/Form'

export default async function page({ params }: any) {
  const { data, status } = await fetchCategory(params.id)
  if (status !== "success") return notFound()
  return <CategoryForm data={data} />
}
