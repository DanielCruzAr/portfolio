const SiteInfo = ({
    siteVisits,
    cvCounter,
}: {
    siteVisits: number;
    cvCounter: number;
}) => {
    return (
        <div className="fixed bottom-4 right-4 bg-background bg-opacity-80 backdrop-blur-md p-3 rounded-lg shadow-md space-y-1">
            <p className="text-gray-500">Total Visits: {siteVisits}</p>
            <p className="text-gray-500">CV Downloads: {cvCounter}</p>
        </div>
    );
};

export default SiteInfo;
