import React from 'react'

export default function Dashboard() {
  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 w-full'>
      <div className='max-w-3xl mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-4'>Dashboard</h1>
        <p className='text-lg text-gray-700'>Welcome to your dashboard! Here you can manage your settings, view analytics, and more.</p>
      </div>
    </main>
  )
}
