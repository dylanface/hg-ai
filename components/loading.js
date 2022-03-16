export default function Loading() {


    return (
        <CenteredContainer>
            <div className="rounded-2xl max-w-7xl mx-auto bg-sky-500 inline-flex">
                <svg className="animate-spin -ml-1 mr-3 h-20 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="animate-pulse opacity-20 py-7 px-2 text-lg">Loading...</span>
            </div>    
        </CenteredContainer>
    )
}

function CenteredContainer({ children }) {


    return (
        <div className="relative top-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <div className="max-w-3xl mx-auto self-center">{children}</div>
        </div>
    )
}