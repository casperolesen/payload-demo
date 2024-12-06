import { createClient } from '@/supabase/server'

export default function LoginPage() {
  async function login(formData: FormData) {
    'use server'

    const supabase = await createClient()

    const rawFormData = {
      username: formData.get('username'),
      password: formData.get('password'),
    }
    console.log(rawFormData)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: rawFormData.username,
      password: rawFormData.password,
    })

    console.log(data, error)
  }
  return (
    <div>
      <h1>Login</h1>
      <form action={login}>
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}