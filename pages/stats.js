import { useSession, signIn, signOut } from "next-auth/react"
import Loading from "../components/loading";
import NewUserAlert from "../components/newAlert";

export default function Stats() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Loading />
    }

    return session ? (
        <div className="flex flex-col overflow-hidden">
        {session.user.transactions.length < 1 ? (
            <NewUserAlert />
        ) : (
            <></>
        )}
        <div className="-my-2 overflow-hidden max-w-screen sm:-mx-6 lg:-mx-8 self-center">
            <div className="py-2 align-middle inline-block min-w-full max-w-screen sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th
                        scope="col"
                        className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        User
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                        Transaction Type
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                    >
                        Transaction ID
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Status
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                    >
                        Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {session.user.transactions.map((statSet) => (
                    <tr key={statSet._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={session.user.image} alt="" />
                            </div>
                            <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{session.user.name}</div>
                            <div className="text-sm text-gray-500 hidden md:block">{session.user.email}</div>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-900">{statSet.data.action}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-500">{statSet._id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Success
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  hidden md:table-cell">{new Date(statSet.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            View
                        </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    ) : (
        <div>You can not access this page without being signed in!</div>
    );
}
  