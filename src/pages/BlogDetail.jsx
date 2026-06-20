import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts'

function BlogDetail() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) return <div className="viaro-blog-not-found"><span>404</span><h1>Historia no encontrada</h1><Link to="/inspiracion">Volver a inspiración</Link></div>

  const related = blogPosts.filter(item => item.slug !== post.slug).slice(0, 3)

  return (
    <article className="viaro-article-page">
      <header className="viaro-article-header">
        <Link to="/inspiracion"><ArrowLeft size={16} /> Volver a inspiración</Link>
        <span>{post.category} · {post.date} · {post.readTime} de lectura</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>

      <div className="viaro-article-hero"><img src={post.image} alt={post.title} /></div>

      <div className="viaro-article-layout">
        <aside><span>VIARO Journal</span><p>Ideas para vestir con libertad, seguridad y una intención propia.</p><div>{post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{String(index + 1).padStart(2, '0')} {section.title}</a>)}</div></aside>
        <div className="viaro-article-body">
          <p className="viaro-article-intro">{post.introduction}</p>
          {post.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span><h2>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <blockquote>“{post.quote}”</blockquote>
          <div className="viaro-article-signoff"><span>VIARO</span><p>Wear your freedom.</p></div>
        </div>
      </div>

      <section className="viaro-related-posts">
        <div><span>Sigue explorando</span><h2>Más inspiración</h2></div>
        <div className="viaro-related-grid">{related.map(item => <Link to={`/inspiracion/${item.slug}`} key={item.slug}><div><img src={item.image} alt={item.title} loading="lazy" /></div><span>{item.category}</span><h3>{item.title}</h3><strong>Leer artículo <ArrowRight size={15} /></strong></Link>)}</div>
      </section>
    </article>
  )
}

export default BlogDetail
