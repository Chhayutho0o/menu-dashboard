import React from 'react'
import { notFound } from 'next/navigation'
import { fetchMerchant } from '@/actions/merchants'
import MerchantInfo from '@/components/merchants/Info'

export default async function page({ params }: any) {
  const { data, status } = await fetchMerchant(params.id)
  if (status !== "success") return notFound()
  return <MerchantInfo data={data} />
}
