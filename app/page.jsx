import HeroSection from '@/components/hero'
import { statsData, featuresData, howItWorksData, testimonialsData } from '@/data/landing'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const page = () => {
  return (

    <div className='mt-40'>
      {/* Bnner image */}
      <HeroSection />
      {/* stats data */}

      {/* section 1 */}
      <section className='py-20 bg-blue-50'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {statsData.map((statsData, index) => (
              <div key={index} className='text-center'>

                <div className='text-4xl font-bold text-blue-600 mb-2'>{statsData.value}</div>
                <div className='text-gray-600'>{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* section 2 */}
      {/* featuresData */}
      <section className="py-20">
        <div className='container mx-auto px-4'>
          <h2 className='font-bold text-center text-3xl p-6'>Everything you need to manage your finances</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-4 ">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* howItWorksData */}

      <section className="py-20">
        <div className='container mx-auto px-4'>
          <h2 className='font-bold text-center text-3xl p-6'>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksData.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* testimonialsData */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-center text-3xl p-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  {/* Profile section */}
                  <div className="flex items-center mb-4 gap-3">
                    <Image
                      src={feature.image}
                      alt={feature.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{feature.name}</div>
                      <div className="text-sm text-gray-600">{feature.role}</div>
                    </div>
                  </div>

                  {/* Quote section */}
                  <p className="text-gray-600">{feature.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ready section */}
      <section className='py-20 bg-blue-500'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-center mb-4'>
            Ready to Take Control of Your Finances ?
          </h2>
          <p className='text-blue-100 mb-8 max-w-2xl mx-auto'>
            Your journey to effortless money management begins with SpendSense
          </p>
          <Button size='lg' className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce">
            Start Free Trial

          </Button>
        </div>
      </section>

    </div>





  )
}

export default page
