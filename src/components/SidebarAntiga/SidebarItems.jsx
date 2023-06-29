// src/components/Sidebar/SidebarItems.jsx
import React, { useState } from 'react'
import Link from 'next/link'
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName
} from './SidebarStyles'
import { useRouter } from 'next/router'
import { dummyData } from './Data'

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(0)
  const router = useRouter()

  const handler = (id, path) => {
    setActiveItem(id)
    router.push(path)
  }

  return (
    <ItemsList>
      {dummyData.map((itemData, index) => (
        <ItemContainer
          key={index}
          onClick={() => handler(itemData.id, itemData.path)}
          className={itemData.id === activeItem ? 'active' : ''}
        >
          {/* <Link href={itemData.path} passHref> */}
          <ItemWrapper>
            {itemData.icon}
            <ItemName displaySidebar={displaySidebar}>{itemData.name}</ItemName>
          </ItemWrapper>
          {/* </Link> */}
        </ItemContainer>
      ))}
    </ItemsList>
  )
}

export default SidebarItems
