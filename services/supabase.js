import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const submitInquiry = async (inquiryData) => {
    try {
        const { data, error } = await supabase
            .from('inquiries')
            .insert([inquiryData])
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        throw error;
    }
}; 