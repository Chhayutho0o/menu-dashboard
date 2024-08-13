import React from 'react'
import { notFound } from 'next/navigation'
import RoleForm from '@/components/roles/Form'
import { getPrivileges, getRole } from '@/actions/roles'

export default async function page({ params }: any) {
  const { data, status } = await getRole(params.id)
  if (status !== "success") return notFound()
  const { data: privilegeData } = await getPrivileges()
  return <RoleForm data={data} privileges={privilegeData} />
}
