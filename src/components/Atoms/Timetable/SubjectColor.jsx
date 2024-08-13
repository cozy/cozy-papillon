import React from 'react'

export const SubjectColor = ({ color }) => {
  return (
    <div
      style={{
        minWidth: '4px',
        backgroundColor: color || '#888'
      }}
      className="u-flex u-flex-items-center u-flex-justify-center u-h-3 u-bdrs-4"
    />
  )
}
