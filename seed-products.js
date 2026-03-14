const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dummyProducts = [
    {
        name: 'Gamis Hitam Elegan',
        price: 250000,
        category: 'Pakaian Wanita',
        image_url: 'https://images.unsplash.com/photo-1589139855581-2287233fc296?auto=format&fit=crop&q=80&w=400',
        description: 'Gamis premium berbahan silk jatuh, sangat nyaman digunakan untuk hari raya.'
    },
    {
        name: 'Khimar Syar\'i',
        price: 120000,
        category: 'Pakaian Wanita',
        image_url: 'https://images.unsplash.com/photo-1584273894458-45ec6406eafa?auto=format&fit=crop&q=80&w=400',
        description: 'Khimar syari menutup dada dengan pad antem.'
    },
    {
        name: 'Koko Eksklusif',
        price: 185000,
        category: 'Pakaian Pria',
        image_url: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=400',
        description: 'Baju koko pria kerah shanghai dengan bahan katun toyobo.'
    },
    {
        name: 'Tunik Modern Rose',
        price: 195000,
        category: 'Pakaian Wanita',
        image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400',
        description: 'Tunik wanita dengan potongan modern asimetris.'
    },
    {
        name: 'Sajadah Travel Premium',
        price: 85000,
        category: 'Aksesoris',
        image_url: 'https://images.unsplash.com/photo-1605809712079-8833e2187d90?auto=format&fit=crop&q=80&w=400',
        description: 'Sajadah lipat pocket yang mudah dibawa kemana-mana.'
    }
];

async function seedDatabase() {
    console.log('🌱 Starting to seed products...');

    console.log('🧹 Clearing old products...');
    const { error: deleteError } = await supabase.from('products').delete().neq('id', 0);

    if (deleteError) {
        console.error('Failed to clear old products:', deleteError.message);
    }

    console.log('📦 Inserting 5 premium products...');
    const { data, error } = await supabase
        .from('products')
        .insert(dummyProducts)
        .select();

    if (error) {
        console.error('❌ Error inserting products:', error.message);
    } else {
        console.log('✅ Successfully inserted products!');
        console.log(`Added ${data.length} items to your database.`);
    }

    process.exit();
}

seedDatabase();
