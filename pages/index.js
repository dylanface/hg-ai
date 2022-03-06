import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Index(props) {
  const { data: session, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

  return (
      <>
        {session ? (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-300 px-4 py-5 sm:px-6">
                  <div className="mt-8">
                    <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
                      Welcome {session.user.name}
                    </h2>
                    <p className="mt-3 text-lg leading-6 text-gray-800">
                      This is a demo of the Hunger Games AI, a tool to help you
                      build AI models for the Hunger Games.
                    </p>
                  </div>
                </div>
              </div>
          </div>
        ) : (
          <main>
        <div>
          {/* Hero card */}
          <div className="relative">
            {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" /> */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden top-4">
                <div className="absolute inset-0">
                  <Image
                    src={require('../images/mockingjay1118151280jpg-19b567_160w.jpg')}
                    alt="hero photo"
                    objectFit="cover"
                    layout="fill"
                    />
                  <div className="absolute py-5 inset-0 bg-gray-600 mix-blend-multiply" />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">Simulate a truly unique</span>
                    <span className="block text-indigo-300">Hunger Games</span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl shadow-sm text-indigo-300 sm:max-w-3xl">
                    Welcome to the demo of Hunger Games AI, this tool allows you to customise and simulate Hunger Games with players of your choosing.
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <a
                        href="#"
                        onClick={() => signIn()}
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        Sign In
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-400 sm:px-8"
                      >
                        More Info
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo cloud */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                this project was built with
              </p>
              <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 h-12">
                  <Image src={require('../images/OpenAI_Logo.svg')} alt="OpenAi" objectFit="contain" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 h-12">
                  <Image src={require('../images/reactjs-ar21.svg')} alt="React" objectFit="contain" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1 h-12">
                  <Image src={require('../images/tailwindcss-ar21.svg')} alt="Tailwind CSS" objectFit="contain" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1 h-12">
                  <Image src={require('../images/next-black.svg')} alt="Next.js" objectFit="contain" />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1 h-12">
                  <Image src={require('../images/Unity_Technologies_logo.svg')} alt="Unity" objectFit="contain" />
                </div>
              </div>
            </div>
        </div>

        {/* More main page content here... */}
      </main>
        )}
      </>
  );
}