import React from 'react'
import { Header } from '../components/header/header'
import FooterForm from '../components/footer/footer'
import CategorySlider from '../components/Services/CategorySlider'
import ServiceGrid from '../components/Services/servic'


export default function services() {
  return (
    <>
    <Header/>
    <CategorySlider/>
    <ServiceGrid/>
    <FooterForm/>
    </>
  )
}
