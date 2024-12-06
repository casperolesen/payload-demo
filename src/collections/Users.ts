import { createClient } from '@/supabase/server'
import { parseCookies, type AuthStrategyResult, type CollectionConfig, type User } from 'payload'

const TOKEN = '123'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  endpoints: [
    {
      method: 'get',
      path: '/oauth/google',
      handler: async () => {
        return Response.redirect('localhost:3000/redirected')
      },
    },
  ],
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: 'simple',
        authenticate: async ({ headers, payload, isGraphQL }): Promise<AuthStrategyResult> => {
          const supabase = await createClient()
          const { data, error } = await supabase.auth.getUser()

          if (error || !data.user) {
            return { user: null }
          }

          return { user: { id: '', collection: 'users' } }

          // const payloadUser = await payload.find({
          //   collection: 'users',
          //   where: { email: data.user.email },
          // })

          // if (payloadUser.docs.length === 0) {
          //   const newPayloadUser = await payload.create({
          //     collection: 'users',
          //     data: { email: data.user.email },
          //   })
          //   return { user: { ...newPayloadUser, collection: 'users' } }

          //   return { user: { id: 'fakeID', collection: 'users' } }
          // }

          return { user: { ...payloadUser.docs[0], collection: 'users' } }
        },
      },
    ],
    //useAPIKey: true,
    // strategies: [
    //   {
    //     name: 'custom',
    //     authenticate: async ({ headers, payload, isGraphQL }) => {
    //       // Implement your own authentication logic here
    //       // Return the user object if authentication is successful
    //       // Return null if authentication failed
    //       //console.log('HIT', headers.entries())
    //       const entries = headers.entries()
    //       for (const entry of entries) {
    //         console.log(entry)
    //       }
    //       const token = headers.get('authorization')
    //       console.log('TOKEN', token)
    //       if (!token) {
    //         return {
    //           user: null,
    //         }
    //       }
    //       const usersQuery = await payload.find({
    //         collection: 'users',
    //         where: { token: { equals: token } },
    //       })
    //       const user = usersQuery.docs[0]
    //       console.log('USER', user)
    //       if (user) {
    //         return {
    //           user: { collection: 'users', id: user.id, token: user.token },
    //         }
    //       }
    //       if (!user) {
    //         const newUser = await payload.create({ collection: 'users', data: { token } })
    //         return {
    //           user: { collection: 'users', id: newUser.id, token: newUser.token },
    //         }
    //       }
    //       return {
    //         user: null,
    //       }
    //     },
    //   },
    // ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    { name: 'email', type: 'email', required: true, unique: true },
    //{ name: 'token', type: 'text', index: true, unique: true },
    //{ name: 'role', type: 'text', required: true, defaultValue: 'user' },
  ],
}
