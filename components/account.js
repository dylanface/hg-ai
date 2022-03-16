import NoAuth from "./noAuth";

export default function Account({ session }) {

  const state = {
    multi_id: session?.user.id,
    bound_email: session?.user.email,
    parsedName: session?.user.parsedName,
  };  


    return session ? (

        <>
        <section aria-labelledby="account-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 id="account-heading" className="text-lg leading-6 font-medium text-gray-900">
                          Account Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage your account details. This information is publicly available in some places on the site.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <input
                            defaultValue={state.parsedName.first}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <input
                            defaultValue={state.parsedName.last}
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="cc-family-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            readOnly={true}
                            value={state.bound_email}
                            type="text"
                            name="email-address"
                            id="email-address"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="multiplayer_id" className="block text-sm font-medium text-gray-700">
                            Multiplayer ID
                          </label>
                          <input
                            readOnly={true}
                            value={state.multi_id}
                            type="text"
                            name="multiplayer_id"
                            id="multiplayer_id"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                      </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Save
                      </button>
                    </div>

                  </div>
                </form>
              </section>
        </>

    ) : (
      <>
      <NoAuth />
      </>
    )

}