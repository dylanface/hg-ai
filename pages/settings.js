import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import { BellIcon, CogIcon, CreditCardIcon, KeyIcon, ViewGridAddIcon } from '@heroicons/react/outline'

import Loading from "../components/loading";
import Account from "../components/account";
import Stats from "../components/stats";
import Billing from "../components/billing";

const subNavigation = [
  { name: 'Account', value: 'account', href: '#', icon: CogIcon, current: false },
  { name: 'API Stats', value: 'stats', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', value: 'notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Auto Billing', value: 'billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Integrations', value: 'integrations', href: '#', icon: ViewGridAddIcon, current: false },
]

// const payments = [
//   {
//     id: 1,
//     date: '1/1/2020',
//     datetime: '2020-01-01',
//     description: 'Business Plan - Annual Billing',
//     amount: 'CA$109.00',
//     href: '#',
//   },
//   // More payments...
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Settings(props) {

  const router = useRouter();
    
  const { data: session, status } = useSession()
  const [selectedPage, setSelectedPage] = useState('account')

  useEffect(()=>{
    if(!router.isReady) return;
    if (router.query.page) {
      setSelectedPage(router.query.page)
      router.replace('/settings', undefined, { shallow: true });
    }
    return

}, [router.isReady]);

  if (status === "loading") {
      return <Loading />
  }

  
  return (
    <>
      <div className="h-full overflow-hidden">
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                    item.value === selectedPage ? item.current = true : item.current = false,
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setSelectedPage(item.value)}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 text-slate-600 hover:bg-white'
                        : 'text-slate-300 hover:text-gray-600 hover:bg-gray-50',
                      'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-slate-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </nav>
            </aside>


            <SelectedWindow window={selectedPage} session={session} />
              
          </div>
        </main>
      </div>
    </>
  )
}

function SelectedWindow({ window, session }) {



    switch (window) {

        case 'account':
            return (
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                    <Account session={session} />
                </div>
            )

        case 'stats':
            return (
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                    <Stats />
                </div>
            )

        case 'notifications':
            return (
                <></>
            )

        case 'billing':
            return (
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                  <Billing session={session} />
                </div>
            )

        case 'integrations':
            return (
                <></>
            )
                    
    }

}