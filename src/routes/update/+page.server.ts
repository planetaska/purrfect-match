import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from './$types';

export const actions : Actions ={
    update_password: async ({ request, locals }) => {
        const formData = await request.formData()
        const password = formData.get('new_password') as string

        const { data, error: err } = await locals.supabase.auth.updateUser({
            password: password
        })

        if (err) {
            if (err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
                return fail(400, {
                    error: "invalidCredentials", invalid: true, message: err.message
                })
            }
            return fail(500, {
                error: "Server error. Please try again later.",
            })
        }

        redirect(303, "/sign-in");
    },
}

// export const load = async ({ locals }) => {
//     // if there is no user's session redirect back to the home page
//     if (!locals.session) {
//         redirect(303, '/');
//     }
//   }