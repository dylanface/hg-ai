
export default function Index(props) {

  return (
    <div className="bg-slate-700 w-screen h-screen">
        {props.user ? (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-300 px-4 py-5 sm:px-6">
                  <div className="mt-8">
                    <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
                      Welcome {props.user.name}
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
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-300 px-4 py-5 sm:px-6">
                  <div className="mt-8">
                    <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
                      Welcome to the Hunger Games AI
                    </h2>
                    <p className="mt-3 text-lg leading-6 text-gray-800">
                      This is a demo of the Hunger Games AI, a tool to help you
                      build AI models for the Hunger Games.
                    </p>
                  </div>
                </div>
              </div>
          </div>
        )}
    </div>
  );
}