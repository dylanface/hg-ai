import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, PlusSmIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

const defaultNav = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Saved Games', href: '/saves', current: false },
    { name: 'Feedback', href: '/feedback', current: false },
    { name: 'About', href: '/about', current: false },
]

const profileNav = [
    { name: 'API Stats', href: '/settings?page=stats' },
    { name: 'Settings', href: '/settings' },
    { true: { name: 'Sign out', href: '#', onClick: () => signOut() }, false: { name: 'Sign in', href: '#', onClick: () => signIn() } },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HGNavabar() {
    const { data: session } = useSession()

    const router = useRouter()
    const navigation = defaultNav.map((nav) => ({
      ...nav,
      current: router.asPath === nav.href,
    }))

    const user = session?.user || undefined;

  return (
    <Disclosure as="nav" className="bg-slate-700">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">

              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

                <div className="flex-shrink-0 flex items-center">
                  <div className='block lg:hidden h-8 w-auto'>
                  <Image
                    src={require('/images/workflow-mark-indigo-500.svg')}
                    alt="Hunger Games AI"
                    />
                    </div>
                    <div className="hidden lg:block h-8 w-auto">
                  <Image
                    src={require('/images/workflow-logo-indigo-500-mark-white-text.svg')}
                    alt="Hunger Games AI"
                    />
                    </div>
                </div>

                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                </div>

              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 hover:outline-none hover:ring-2 hover:ring-indigo-500"
                  >
                    <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    <span>New Simulation</span>
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white hover:outline-none hover:ring-2 hover:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <UserIconDropDown user={user} />
                </div>
              </div>
                
              </div>
            </div>

          {/* Mobile menu, show/hide with tailwind. */}
          <MobileNav navigation={navigation} user={user} />
          
        </>
      )}
    </Disclosure>
  )
}

function UserIconDropDown({ user }) {

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full hover:outline-none hover:ring-2 hover:ring-white">
          <span className="sr-only">Open user menu</span>
          {user ? (
              <img
                className="h-8 w-8 rounded-full"
                src={user.image}
                alt=""
            />
          ) : (
            <img
                className="h-8 w-8 rounded-full"
                src="https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=612x612&w=0&h=D6OBNUY7ZxQTAHNVtL9mm2wbHb_dP6ogIsCCWCqiYQg="
                alt=""
              />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {profileNav.map((item) => {
            if (item.true) {
              return user ? (
                <Menu.Item key={item.true.name}>
                {({ active }) => (
                  <a
                    href={item.true.href}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    onClick={item.true.onClick}
                  >
                    {item.true.name}
                  </a>
                )}
                </Menu.Item>
              ) : (
                <Menu.Item key={item.false.name}>
                {({ active }) => (
                  <a
                    href={item.false.href}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    onClick={item.false.onClick}
                  >
                    {item.false.name}
                  </a>
                )}
                </Menu.Item>
              )
            } else {
              return (
                <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    {item.name}
                  </a>
                )}
                </Menu.Item>
              )
            }
          })}
  
        </Menu.Items>
      </Transition>
    </Menu>
  )

}

function MobileNav({ navigation, user }) {
  
  return (
    <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>

            <div className="pt-4 pb-3 border-t border-gray-700">

              <div className="flex items-center px-5 sm:px-6">

                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user?.image ? user.image : "https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=612x612&w=0&h=D6OBNUY7ZxQTAHNVtL9mm2wbHb_dP6ogIsCCWCqiYQg="} alt="" />
                </div>

                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name ? user.name : "Game Master"}</div>
                  <div className="text-sm font-medium text-gray-400">{user?.email ? user.email : "Not Logged In or Unathorized"}</div>
                </div>

                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

              </div>

              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {profileNav.map((item) => {
                  if (item.true) {
                    return user ? (
                    <Disclosure.Button
                    key={item.true.name}
                    as={Fragment}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <a onClick={item.true.onClick} href={item.true.href}>
                      {item.true.name}
                      </a>
                    </Disclosure.Button>
                    ) : (
                    <Disclosure.Button
                    key={item.false.name}
                    as={Fragment}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <a onClick={item.false.onClick} href={item.false.href}>
                      {item.false.name}
                      </a>
                    </Disclosure.Button>
                    )
                  } else {
                    return (
                    <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                    {item.name}
                    </Disclosure.Button>
                    )
                  }
                })}
              </div>
              </div>

          </Disclosure.Panel>
  )
}