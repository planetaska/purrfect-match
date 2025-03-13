import { fail } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'

import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request, cookies, locals: { supabase } }) => {
        console.log("testing form submission!");
        const formData = await request.formData()
        const newPassword = formData.get('new-password') as string
        const confirmPassword = formData.get('confirm-password') as string

        console.log(newPassword);

        if (newPassword !== '' && confirmPassword === newPassword) {
            const {error} = await supabase.auth.updateUser({ password: newPassword })
            if (error) {
                console.error(error)
                return fail(500, { error})
            } else {
                console.log("succes!");
                redirect(303, '/sign-in', { type: 'success', message: "Sign in" }, cookies)
            }
        } else{
            console.log("passwords don't match!");
        }
    }
}