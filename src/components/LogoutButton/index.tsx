'use client'

import { createClient } from '@/supabase/client'
import { redirect } from 'next/navigation'
import {
  CustomComponent,
  PayloadComponent,
  PayloadComponentProps,
  ServerComponentProps,
} from 'payload'

export default function LogoutButton({ payload }: ServerComponentProps) {
  const logout = async () => {
    console.log('LOGGING OUT')
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
    console.log('LOGGED OUT')

    redirect('/admin')
  }
  return <button onClick={logout}>Logout</button>
}
