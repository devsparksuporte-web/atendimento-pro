import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Multi-tenant helper: always filter by company_id
export async function queryByCompany(table, companyId, filters = {}) {
    let query = supabase.from(table).select('*').eq('company_id', companyId);
    Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
    });
    return query;
}
