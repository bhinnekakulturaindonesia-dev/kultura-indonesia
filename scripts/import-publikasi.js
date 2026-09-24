// Script untuk import publikasi dari markdown ke Supabase
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@supabase/supabase-js');

// Supabase config - GANTI dengan credentials Anda!
const supabaseUrl = 'https://kukkaywsmotiwyaoknpe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1a2theXdzbW90bHd5YW9rbnBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA4NDMzNiwiZXhwIjoyMDg3NjYwMzM2fQ.95iax0tENDtIT9QBTi9Wk_VXmnknhttr8rQtE0H5Nwc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importPublikasi() {
  const contentDir = path.join(__dirname, '../content/publikasi');
  const files = fs.readdirSync(contentDir);
  
  console.log(`Found ${files.length} files to import...`);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Generate slug from filename
    const slug = file.replace('.md', '');
    
    // Prepare data for Supabase
    const publikasiData = {
      judul: frontmatter.title || 'Untitled',
      slug: slug,
      ringkasan: frontmatter.excerpt || '',
      konten: content,
      gambar_url: frontmatter.coverImage || '',
      penulis: frontmatter.author?.name || 'Tim Kultura',
      tanggal: frontmatter.date || new Date().toISOString().split('T')[0],
      status: 'published'
    };
    
    console.log(`Importing: ${publikasiData.judul}...`);
    
    // Insert to Supabase
    const { data, error } = await supabase
      .from('publikasi')
      .insert([publikasiData]);
    
    if (error) {
      console.error(`❌ Error importing ${file}:`, error.message);
    } else {
      console.log(`✅ Imported: ${publikasiData.judul}`);
    }
  }
  
  console.log('\n🎉 Import completed!');
}

importPublikasi().catch(console.error);
