// Generate Product Schema for Google Rich Results
export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Battery Capacity',
        value: `${product.capacity} Wh`
      },
      {
        '@type': 'PropertyValue',
        name: 'Power Output',
        value: `${product.output} W`
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: `${product.weight} lbs`
      },
      {
        '@type': 'PropertyValue',
        name: 'Warranty',
        value: product.warranty
      }
    ]
  }
}

// Generate Article Schema for Blog Posts
export function generateArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'OffGrid Power',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theloadcalc.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url
    }
  }
}

// Generate FAQ Schema
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}