import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { assetUrl } from '../utils/assets'

const campaigns = [
  {
    id: 'urban',
    eyebrow: 'VIARO / 01',
    title: 'La ciudad cambia.\nTu esencia no.',
    copy: 'Diseño esencial para el hombre que se mueve con seguridad, comodidad y carácter.',
    image: assetUrl('/images/viaro/viaro-urban-hero.jpg'),
    link: '/products',
    cta: 'Descubrir Urban',
    align: 'left',
  },
  {
    id: 'craft',
    eyebrow: 'Diseñado en Colombia',
    title: 'La diferencia\nse siente.',
    copy: 'Materiales suaves, líneas limpias y cortes pensados para acompañarte todos los días.',
    image: assetUrl('/images/viaro/viaro-product-still.jpg'),
    link: '/products',
    cta: 'Conocer la colección',
    align: 'left',
  },
  {
    id: 'wild',
    eyebrow: 'VIARO WILD',
    title: 'Muévete sin\npedir permiso.',
    copy: 'Una línea creada para los días que empiezan sin mapa y terminan siendo memorables.',
    image: assetUrl('/images/viaro/viaro-wild-coast.jpg'),
    link: '/products',
    cta: 'Explorar Wild',
    align: 'right',
  },
]

const testimonials = [
  {
    quote: 'El ajuste se siente pensado de verdad. Se mantiene cómodo durante todo el día y el diseño es impecable.',
    name: 'Mateo R.',
    location: 'Miami, FL',
  },
  {
    quote: 'La tela es ligera, suave y conserva muy bien la forma. Es el tipo de básico que termina cambiando todo el clóset.',
    name: 'Daniel C.',
    location: 'New York, NY',
  },
  {
    quote: 'Minimalista, cómodo y con carácter. Me gusta saber que detrás hay diseño y fabricación colombiana.',
    name: 'Andrés M.',
    location: 'Austin, TX',
  },
]

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial(current => (current + 1) % testimonials.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const showPrevious = () => {
    setActiveTestimonial(current => (current - 1 + testimonials.length) % testimonials.length)
  }

  const showNext = () => {
    setActiveTestimonial(current => (current + 1) % testimonials.length)
  }

  return (
    <div className="viaro-home">
      <div className="campaign-stack" aria-label="Campañas VIARO">
        {campaigns.map((campaign, index) => (
          <section
            className={`campaign-panel campaign-panel-${campaign.id}`}
            key={campaign.id}
            aria-labelledby={`campaign-title-${campaign.id}`}
          >
            <img
              src={campaign.image}
              alt=""
              className="campaign-media"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className="campaign-shade" />
            <div className={`campaign-copy campaign-copy-${campaign.align}`}>
              <span className="campaign-kicker">{campaign.eyebrow}</span>
              <h1 id={`campaign-title-${campaign.id}`}>
                {campaign.title.split('\n').map(line => <span key={line}>{line}</span>)}
              </h1>
              <p>{campaign.copy}</p>
              <Link className="viaro-cta" to={campaign.link}>
                {campaign.cta}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="collection-section" id="collections" aria-labelledby="collections-title">
        <div className="viaro-section-heading">
          <span>Nuestras líneas</span>
          <h2 id="collections-title">Entre dos mundos</h2>
          <p>Dos energías. Una misma forma de entender la libertad.</p>
        </div>

        <div className="collection-grid">
          <Link className="collection-card" to="/products">
            <img src={assetUrl('/images/viaro/viaro-urban-hero.jpg')} alt="Hombre vistiendo la línea urbana VIARO" loading="lazy" />
            <div className="collection-card-shade" />
            <div className="collection-card-copy">
              <span>01</span>
              <h3>VIARO URBAN</h3>
              <p>Sobria, precisa y diseñada para el ritmo de la ciudad.</p>
              <strong>Ver la línea <ArrowRight size={16} aria-hidden="true" /></strong>
            </div>
          </Link>

          <Link className="collection-card" to="/products">
            <img src={assetUrl('/images/viaro/viaro-wild-coast.jpg')} alt="Hombre explorando la costa con la línea VIARO Wild" loading="lazy" />
            <div className="collection-card-shade" />
            <div className="collection-card-copy">
              <span>02</span>
              <h3>VIARO WILD</h3>
              <p>Movimiento, naturaleza y una libertad sin explicaciones.</p>
              <strong>Ver la línea <ArrowRight size={16} aria-hidden="true" /></strong>
            </div>
          </Link>
        </div>
      </section>

      <section className="testimonial-section" id="reviews" aria-labelledby="reviews-title">
        <div className="testimonial-label">
          <span>Comunidad VIARO</span>
          <h2 id="reviews-title">Lo que se siente, se comparte.</h2>
        </div>

        <div className="testimonial-carousel" aria-live="polite">
          <Quote className="testimonial-quote-icon" size={42} aria-hidden="true" />
          <blockquote>
            “{testimonials[activeTestimonial].quote}”
          </blockquote>
          <div className="testimonial-author">
            <strong>{testimonials[activeTestimonial].name}</strong>
            <span>{testimonials[activeTestimonial].location}</span>
          </div>

          <div className="testimonial-controls">
            <button type="button" onClick={showPrevious} aria-label="Opinión anterior">
              <ArrowLeft size={20} />
            </button>
            <div className="testimonial-dots" aria-label="Seleccionar opinión">
              {testimonials.map((testimonial, index) => (
                <button
                  type="button"
                  key={testimonial.name}
                  className={index === activeTestimonial ? 'active' : ''}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Ver opinión ${index + 1}`}
                  aria-current={index === activeTestimonial ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" onClick={showNext} aria-label="Siguiente opinión">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
