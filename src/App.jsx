import { Fragment } from 'react'
import { MainForm } from "./components"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  return (
    <>
      <div className="flex flex-col flex-1">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-14 w-auto lg:hidden"
                        src="https://drive.google.com/uc?export=view&id=13azTADNDB7G94Ia2rbgNiz3YB8NnHzyj"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-14 w-auto lg:block"
                        src="https://drive.google.com/uc?export=view&id=13azTADNDB7G94Ia2rbgNiz3YB8NnHzyj"
                        alt="Your Company"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <div className="py-4 flex flex-col flex-1">
          <header className="mb-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Unsubscribe Form</h1>
            </div>
          </header>
          <main className="flex flex-col flex-1">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col flex-1 w-full">
              <MainForm />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

