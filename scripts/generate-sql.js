// Generate SQL INSERT untuk publikasi
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function escapeSQL(str) {
  if (!str) return "''";
  return "'" + str.replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

async function generateSQL() {
  const contentDir = path.join(__dirname, '../content/publikasi');
  const files = fs.readdirSync(contentDir);
  
  let sql = "-- Insert publikasi data\n\n";
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const slug = file.replace('.md', '');
    
    sql += `INSERT INTO publikasi (judul, slug, ringkasan, konten, gambar_url, penulis, tanggal, status)\n`;
    sql += `VALUES (\n`;
    sql += `  ${escapeSQL(frontmatter.title || 'Untitled')},\n`;
    sql += `  ${escapeSQL(slug)},\n`;
    sql += `  ${escapeSQL(frontmatter.excerpt || '')},\n`;
    sql += `  ${escapeSQL(content)},\n`;
    sql += `  ${escapeSQL(frontmatter.coverImage || '')},\n`;
    sql += `  ${escapeSQL(frontmatter.author?.name || 'Tim Kultura')},\n`;
    sql += `  ${escapeSQL(frontmatter.date || new Date().toISOString().split('T')[0])},\n`;
    sql += `  'published'\n`;
    sql += `);\n\n`;
  }
  
  fs.writeFileSync(path.join(__dirname, 'insert-publikasi.sql'), sql);
  console.log('✅ SQL file generated: scripts/insert-publikasi.sql');
  console.log('Copy and run it in Supabase SQL Editor!');
}

generateSQL().catch(console.error);
