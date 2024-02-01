"use client"
export default function Gurd() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('data');
    const items = data ? JSON.parse(data) : null
    if (items !== null) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }

};
