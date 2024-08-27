import React from 'react'

export const SubjectColor = ({ color, style }) => {
  return (
    <div
      style={{
        ...style,
        minWidth: '4px',
        backgroundColor: color || '#888'
      }}
      className="u-flex u-flex-items-center u-flex-justify-center u-h-3 u-bdrs-4"
    />
  )
}
