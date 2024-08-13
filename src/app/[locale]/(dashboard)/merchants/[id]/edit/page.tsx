import React from 'react'
import { notFound } from 'next/navigation'
import { fetchMerchant } from '@/actions/merchants'
import { getAllRoles } from '@/actions/roles'
import MerchantForm from '@/components/merchants/Form'

export default async function page({params}:any) {
  const {data, status} = await fetchMerchant(params.id)
  if(status !== "success") return notFound()
  const {data: roleData} = await getAllRoles() 
  return <MerchantForm data={data} roles={roleData}/>
}
