import type { ListedProduct } from '../types/prompt'

export const SELLER_NAMES = [
  'Robert',
  'Ania',
  'Wojtek',
  'Kasia',
  'Michał',
  'Ola',
] as const

type ListedProductRow = ListedProduct & { imageName: string }

export const LISTED_PRODUCTS: readonly ListedProductRow[] = [
  { item: 'iPhone 13 128 GB', price: '1900 zł', imageName: 'iphone13_128' },
  { item: 'konsola PS5 z padami', price: '2200 zł', imageName: 'ps5_bundle' },
  { item: 'rower górski MTB', price: '1200 zł', imageName: 'rower_mtb' },
  { item: 'rower miejski', price: '850 zł', imageName: 'rower_miejski' },
  { item: 'laptop Dell z gwarancją', price: '2400 zł', imageName: 'dell_laptop' },
  { item: 'AirPods Pro 2', price: '750 zł', imageName: 'airpods_pro2' },
  { item: 'ekspres do kawy DeLonghi', price: '680 zł', imageName: 'delonghi_ekspres' },
]
