'use client'

import React from 'react'
import Card from './Card'
import AnalyticsIcon from '@/assets/icons/Analyticsicon'
import Codeicon from '@/assets/icons/Codeicon'
import FlashIcon from '@/assets/icons/flashicon'
import '../../css/homecard.css'

const MultiCard: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.5rem',
        }}
      >
        <p className="custom-text-medium">Everything You Need to Onboard Users Smoothly</p>
        <p className="custom-text">Powerful features to create engaging onboarding experience</p>
      </div>

      <div className="flex gap-6 p-6 flex-wrap justify-center">
        <Card
          image={<Codeicon />}
          title="No Code Required"
          subtitle="Build interactive tours with our visual editor. No coding skills needed."
        />
        <Card
          image={<FlashIcon />}
          title="Easy Integration"
          subtitle="Add a single script tag to your website and start creating tours in minutes."
        />
        <Card
          image={<AnalyticsIcon />}
          title="Analytics Dashboard"
          subtitle="Track user engagement, completion rates, and optimize your onboarding flow."
        />
      </div>
    </div>
  )
}

export default MultiCard
