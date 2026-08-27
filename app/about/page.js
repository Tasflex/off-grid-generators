'use client'

import Link from 'next/link'
import { Users, Target, Award, Heart, Shield, Zap, Mail, MapPin, Phone } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Editor-in-Chief',
      bio: 'Solar energy expert with 10+ years in the renewable energy industry. Started OffGrid Power to help people prepare for emergencies and embrace sustainable living.',
      image: '/images/team/sarah.jpg',
      expertise: ['Solar Systems', 'Battery Technology', 'Emergency Preparedness']
    },
    {
      name: 'Mike Chen',
      role: 'Technical Writer',
      bio: 'Electrical engineer turned writer. Mike specializes in breaking down complex technical concepts into easy-to-understand guides.',
      image: '/images/team/mike.jpg',
      expertise: ['Electrical Engineering', 'DIY Installation', 'Product Testing']
    },
    {
      name: 'Alex Rivera',
      role: 'Product Reviewer',
      bio: 'Van life enthusiast and outdoor adventurer. Alex has tested 50+ solar generators and portable power stations over the years.',
      image: '/images/team/alex.jpg',
      expertise: ['Van Life', 'Camping Gear', 'Portable Power']
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Honesty & Transparency',
      description: 'We only recommend products we genuinely believe in. All affiliate relationships are clearly disclosed.'
    },
    {
      icon: Target,
      title: 'Expert Testing',
      description: 'Every product we recommend has been tested by our team for at least 30 days before review.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain strict quality standards and only recommend products with proven track records.'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Your safety and satisfaction drive everything we do. We respond to every customer question.'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">About Us</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About OffGrid Power</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to help everyone achieve energy independence. From emergency preparedness 
          to sustainable off-grid living, we provide the knowledge and tools you need to power your life.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="ebay-card p-8 mb-12 bg-gradient-to-r from-blue-50 to-yellow-50">
        <div className="flex items-start">
          <Target className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To make reliable, sustainable power accessible to everyone. We believe that power 
              independence shouldn't be complicated or expensive. Our goal is to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Demystify solar technology and make it accessible to everyone</li>
              <li>Provide unbiased, expert-tested product recommendations</li>
              <li>Help people prepare for emergencies with confidence</li>
              <li>Support the transition to renewable energy</li>
              <li>Build a community of informed, empowered consumers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title} className="ebay-card p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map(member => (
            <div key={member.name} className="ebay-card p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-blue-600 mb-3">{member.role}</p>
              <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {member.expertise.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { number: '10+', label: 'Years Experience' },
          { number: '500+', label: 'Products Tested' },
          { number: '50K+', label: 'Monthly Readers' },
          { number: '15K+', label: 'Email Subscribers' }
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Why Trust Us */}
      <div className="ebay-card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust OffGrid Power?</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Zap className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Independent Testing</h3>
              <p className="text-sm text-gray-600">
                We purchase products at retail price and test them in real-world conditions. 
                No manufacturer influence on our reviews.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Users className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Community Driven</h3>
              <p className="text-sm text-gray-600">
                Our recommendations are informed by feedback from thousands of readers 
                who share their experiences and results.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Award className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Expert Verification</h3>
              <p className="text-sm text-gray-600">
                Every article is reviewed by our team of experts for accuracy, 
                technical correctness, and practical usefulness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-4">Explore our calculators, guides, and products to start your off-grid journey.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators" className="ebay-btn-primary">Use Our Calculators</Link>
          <Link href="/guides" className="ebay-btn-secondary">Read Our Guides</Link>
        </div>
      </div>
    </div>
  )
}