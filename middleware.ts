import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"

export default authMiddleware({
  publicRoutes: ["/"],
  async afterAuth(auth, req, evt) {
    if (!auth.userId) return;

    // try {
    //   // Get user from Clerk
    //   const user = await clerkClient.users.getUser(auth.userId);
      
    //   // Upsert user in Supabase using clerk_id as conflict key
    //   const { error } = await supabase
    //     .from('users')
    //     .upsert({
    //       id: user.id,
    //       clerk_id: user.id,
    //       email: user.emailAddresses[0]?.emailAddress,
    //       name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    //       image_url: user.imageUrl,
    //     }, {
    //       onConflict: 'clerk_id',
    //       ignoreDuplicates: true
    //     })

    //   if (error) {
    //     console.error('Error syncing user to Supabase:', error)
    //   }

    // } catch (error) {
    //   console.error('Error in afterAuth middleware:', error)
    // }
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}