import { getAllRoles } from '@/actions/roles'
import MerchantForm from '@/components/merchants/Form'
import React from 'react'

export default async function page() {
  const {data} = await getAllRoles() 
  return <MerchantForm roles={data}/>
}
