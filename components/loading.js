

export default function Loading() {


    return (
        <CenteredContainer>

            
            <div>Loading...</div>
        </CenteredContainer>
    )
}

function CenteredContainer({ children }) {


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-center">
        {children}
        <div className="max-w-3xl mx-auto">{/* Content goes here */}</div>
        </div>
    )
}