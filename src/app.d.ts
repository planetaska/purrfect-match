/*
Create TypeScript definitions

To prevent TypeScript errors, add type definitions for the new event.locals properties.
 */
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from './database.types.ts' // import generated types

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
		}
		interface PageData {
			session: Session | null
		}
		// interface PageState {}
		// interface Platform {}
		// interface Error {}
	}
}

export {}