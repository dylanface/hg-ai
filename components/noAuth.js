import { useSession, signIn, signOut } from "next-auth/react"

export default function NoAuth(props) {


  return (
    <CenteredContainer>
      <section aria-labelledby="payment-details-heading">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 mx-auto font-medium text-gray-900">
                          You are not authorized to view this page.
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          If you believe this is an error contact the site administrators. Otherwise you can sign in below.
                        </p>
                      </div>

                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <a
                        href="#"
                        onClick={() => signIn()}
                        className="flex px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-slate-700 bg-slate-300 hover:bg-slate-50 sm:px-8"
                      >
                        Sign In
                      </a>
                    </div>
                    

                      </div>
                    </div>
                    
              </section>
    </CenteredContainer>
  )
}

function CenteredContainer({ children }) {


  return (
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
      <div className="max-w-3xl mx-auto self-center">{children}</div>
      </div>
  )
}