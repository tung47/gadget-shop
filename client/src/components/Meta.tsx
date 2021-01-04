import React from 'react'
import { Helmet } from 'react-helmet'

export type MetaProps = {
  title: string,
  description: string,
  keywords: string,
}

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To GadgetShop',
  description: 'The only palce you need to shop for new gadgets',
  keywords: 'electronics, buy electronics, gadgets, buy gadgets',
}

export default Meta