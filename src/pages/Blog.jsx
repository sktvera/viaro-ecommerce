import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const categories = ['Todo', 'Estilo', 'Guías de estilo', 'Tendencias', 'VIARO']

function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const posts = useMemo(() => activeCategory === 'Todo' ? blogPosts : blogPosts.filter(post => post.category === activeCategory), [activeCategory])
  const featuredPost = posts[0]

  return (
    <div className="viaro-blog-page">
      <header className="viaro-blog-hero">
        <span>VIARO Journal</span>
        <h1>Inspiración para<br />vestir tu libertad.</h1>
        <p>Ideas, cultura y estilo masculino para construir un guardarropa que se mueve contigo.</p>
      </header>

      <nav className="viaro-blog-categories" aria-label="Categorías del blog">
        {categories.map(category => <button type="button" key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
      </nav>

      {featuredPost && (
        <main className="viaro-blog-content">
          <article className="viaro-featured-post">
            <Link to={`/inspiracion/${featuredPost.slug}`} className="viaro-featured-post-image"><img src={featuredPost.image} alt={featuredPost.title} /></Link>
            <div>
              <span>{featuredPost.category} · {featuredPost.readTime} de lectura</span>
              <h2><Link to={`/inspiracion/${featuredPost.slug}`}>{featuredPost.title}</Link></h2>
              <p>{featuredPost.excerpt}</p>
              <Link to={`/inspiracion/${featuredPost.slug}`} className="viaro-read-link">Leer artículo <ArrowRight size={17} /></Link>
            </div>
          </article>

          {posts.length > 1 && (
            <section className="viaro-blog-grid" aria-label="Más publicaciones">
              {posts.slice(1).map((post, index) => (
                <article className={`viaro-blog-card ${index === 0 ? 'wide' : ''}`} key={post.slug}>
                  <Link to={`/inspiracion/${post.slug}`} className="viaro-blog-card-image"><img src={post.image} alt={post.title} loading="lazy" /></Link>
                  <div><span>{post.category} · {post.date}</span><h2><Link to={`/inspiracion/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link to={`/inspiracion/${post.slug}`} className="viaro-read-link">Leer más <ArrowRight size={16} /></Link></div>
                </article>
              ))}
            </section>
          )}
        </main>
      )}

      {!featuredPost && <div className="viaro-blog-empty"><h2>Próximamente</h2><p>Estamos preparando nuevas historias para esta categoría.</p></div>}

      <section className="viaro-blog-newsletter">
        <div><span>Notas VIARO</span><h2>Estilo que llega a tu correo.</h2></div>
        <form onSubmit={event => event.preventDefault()}><label><span>Correo electrónico</span><input type="email" placeholder="tu@email.com" required /></label><button type="submit">Quiero inspirarme <ArrowRight size={17} /></button></form>
      </section>
    </div>
  )
}

export default Blog
