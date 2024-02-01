import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoCalendarOutline, IoCartOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline, IoPersonOutline } from "react-icons/io5"
import Image from 'next/image';
import { SidebarItem } from '..';
import { auth } from '@/auth';
import { LogoutButton } from './LogoutButton';

const menuItem = [
  {
    icon: <IoCalendarOutline size={30} />,
    path:'/dashboard',
    title:'Dashboard'
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    path:'/dashboard/rest-todos',
    title:'Rest TODOS'
  },
  {
    icon: <IoListOutline size={30} />,
    path:'/dashboard/server-todos',
    title:'Server Actions'
  },
  {
    icon: <IoCodeWorking size={30} />,
    path:'/dashboard/cookies',
    title:'Cookies'
  },
  {
    icon: <IoCartOutline size={30} />,
    path:'/dashboard/products',
    title:'Products'
  },
  {
    icon: <IoPersonOutline size={30} />,
    path:'/dashboard/profile',
    title:'Perfil'
  },
]
export const Sidebar = async() => {
  const session = await auth()
  const userName = session?.user?.name ?? 'No Name'
  const avatarUrl = (session?.user?.image) 
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
      <div className="-mx-6 px-6 py-4">
        <Link href="#" title="home">
          <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
          alt="tailus logo" 
          className='w-32'
          width={150}
          height={150}
          />
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Image src={avatarUrl} alt="" className="m-auto rounded-full object-cover lg:w-28 lg:h-28" width={150} height={150}/>
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
      </div>

      <ul className="space-y-2 tracking-wide mt-8">
        {
          menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))
        }
      </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
    </div>
  </aside>
  )
}
