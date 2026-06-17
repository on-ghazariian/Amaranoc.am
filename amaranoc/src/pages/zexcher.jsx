import React from 'react'
import Zexch from '../components/zexch/zexch'
import { Header } from '../components/header/header'
import FooterForm from '../components/footer/footer'
import NverCard from '../components/zexch/nverCard'
import PriceZone from '../components/zexch/priceZone'


export default function Zexcher() {
  return (
    <>
    <Header/>
    <Zexch/>
    <NverCard/>
    <PriceZone/>
    <FooterForm/>
    </>
  )
}
