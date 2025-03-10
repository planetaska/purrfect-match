import { fail, redirect } from "@sveltejs/kit"
import { AuthApiError } from "@supabase/supabase-js"
import type { Actions } from './$types';

export const actions : Actions ={
    reset_password: async ({ request, locals }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string

        const { data, error: err } = await locals.supabase.auth.resetPasswordForEmail(
            email, 
            {redirectTo: '/update'}
        )

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: "invalidCredentials", email: email, invalid: true, message: err.message
                })
            }
            return fail(500, {
                error: "Server error. Please try again later.",
            })
        }

        redirect(303, "/");
    },
}

export const load = async ({ locals }) => {
    // if the user is already logged in redirect to the home page 
    if (locals.session) {
        redirect(303, '/');
    }
}